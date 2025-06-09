import { useState, useEffect } from 'react';
import { declarationsApi } from '../services/api/endpoints/declarations';
import { IndexedDBService } from '../services/storage/IndexedDBService';
import { SyncService } from '../services/sync/SyncService';
import type { Declaration } from '../types/declarations';

export function useDeclarations() {
  const [declarations, setDeclarations] = useState<Declaration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeclarations();
  }, []);

  const loadDeclarations = async () => {
    try {
      // Load from IndexedDB first
      const localDeclarations = await IndexedDBService.getAll<Declaration>('declarations');
      if (localDeclarations.length > 0) {
        setDeclarations(localDeclarations);
        setLoading(false);
      }

      // If online, fetch from API and update local storage
      if (navigator.onLine) {
        const response = await declarationsApi.getAll();
        if (response.success && response.data) {
          setDeclarations(response.data.data);
          // Update IndexedDB
          for (const declaration of response.data.data) {
            await IndexedDBService.update('declarations', declaration);
          }
        }
      }
    } catch (error) {
      console.error('Error loading declarations:', error);
    } finally {
      setLoading(false);
    }
  };

  const addDeclaration = async (data: Partial<Declaration>): Promise<Declaration> => {
    const newDeclaration: Declaration = {
      id: crypto.randomUUID(),
      type: data.type!,
      period: data.period!,
      periodicity: data.periodicity!,
      dueDate: data.dueDate!,
      status: 'draft',
      amount: data.amount || 0,
      reference: `${data.type}-${data.period}`
    };

    // Save to IndexedDB
    await IndexedDBService.add('declarations', newDeclaration);
    setDeclarations(prev => [...prev, newDeclaration]);

    // Add to sync queue if offline
    if (!navigator.onLine) {
      await SyncService.addToSyncQueue({
        id: newDeclaration.id,
        type: 'CREATE',
        entity: 'declarations',
        data: newDeclaration
      });
    } else {
      try {
        const response = await declarationsApi.create(newDeclaration);
        if (response.success && response.data) {
          return response.data;
        }
      } catch (error) {
        console.error('Error creating declaration:', error);
      }
    }

    return newDeclaration;
  };

  const submitDeclaration = async (id: string) => {
    const declaration = declarations.find(d => d.id === id);
    if (!declaration) return;

    try {
      if (navigator.onLine) {
        const response = await declarationsApi.submit(id);
        if (response.success && response.data) {
          setDeclarations(prev => prev.map(d => 
            d.id === id ? { ...d, status: 'submitted' } : d
          ));
          await IndexedDBService.update('declarations', {
            ...declaration,
            status: 'submitted'
          });
        }
      } else {
        await SyncService.addToSyncQueue({
          id: declaration.id,
          type: 'UPDATE',
          entity: 'declarations',
          data: { ...declaration, status: 'submitted' }
        });
      }
    } catch (error) {
      console.error('Error submitting declaration:', error);
      throw error;
    }
  };

  return {
    declarations,
    loading,
    addDeclaration,
    submitDeclaration,
    loadDeclarations
  };
}