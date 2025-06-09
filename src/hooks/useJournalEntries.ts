import { useState, useEffect } from 'react';
import { IndexedDBService } from '../services/storage/IndexedDBService';
import { SyncService } from '../services/sync/SyncService';
import { journalEntriesApi } from '../services/api/endpoints/journalEntries';
import type { JournalEntry } from '../types/accounting';

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      // Charger depuis IndexedDB d'abord
      const localEntries = await IndexedDBService.getAll<JournalEntry>('journal_entries');
      if (localEntries.length > 0) {
        setEntries(localEntries);
        setLoading(false);
      }

      // Si en ligne, synchroniser avec l'API
      if (navigator.onLine) {
        const response = await journalEntriesApi.getAll();
        if (response.success && response.data) {
          setEntries(response.data.data);
          // Mettre à jour IndexedDB
          for (const entry of response.data.data) {
            await IndexedDBService.update('journal_entries', entry);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load journal entries:', error);
      setError('Erreur lors du chargement des écritures');
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entry: Partial<JournalEntry>): Promise<void> => {
    try {
      const newEntry: JournalEntry = {
        ...entry,
        id: crypto.randomUUID(),
        status: 'draft',
        totalDebit: entry.lines?.reduce((sum, line) => sum + (line.debit || 0), 0) || 0,
        totalCredit: entry.lines?.reduce((sum, line) => sum + (line.credit || 0), 0) || 0,
        totalVat: entry.lines?.reduce((sum, line) => sum + (line.vatAmount || 0), 0) || 0
      } as JournalEntry;

      // Sauvegarder localement
      await IndexedDBService.add('journal_entries', newEntry);
      setEntries(prev => [newEntry, ...prev]);

      // Ajouter à la file de synchronisation
      await SyncService.addToSyncQueue({
        id: newEntry.id,
        type: 'CREATE',
        entity: 'journal_entries',
        data: newEntry
      });
    } catch (error) {
      console.error('Failed to add journal entry:', error);
      throw error;
    }
  };

  const updateEntry = async (id: string, updates: Partial<JournalEntry>): Promise<void> => {
    try {
      const updatedEntry = { ...entries.find(e => e.id === id), ...updates };
      
      // Mettre à jour localement
      await IndexedDBService.update('journal_entries', updatedEntry);
      setEntries(prev => prev.map(e => e.id === id ? updatedEntry : e));

      // Ajouter à la file de synchronisation
      await SyncService.addToSyncQueue({
        id: updatedEntry.id,
        type: 'UPDATE',
        entity: 'journal_entries',
        data: updatedEntry
      });
    } catch (error) {
      console.error('Failed to update journal entry:', error);
      throw error;
    }
  };

  const deleteEntry = async (id: string): Promise<void> => {
    try {
      // Supprimer localement
      await IndexedDBService.delete('journal_entries', id);
      setEntries(prev => prev.filter(e => e.id !== id));

      // Ajouter à la file de synchronisation
      await SyncService.addToSyncQueue({
        id,
        type: 'DELETE',
        entity: 'journal_entries',
        data: { id }
      });
    } catch (error) {
      console.error('Failed to delete journal entry:', error);
      throw error;
    }
  };

  return {
    entries,
    loading,
    error,
    addEntry,
    updateEntry,
    deleteEntry,
    loadEntries
  };
}