import { LocalStorageService } from './LocalStorageService';
import { StorageKeys } from './StorageKeys';
import type { JournalEntry } from '../../types/accounting';

// src/services/storage/JournalStorageService.ts
export class JournalStorageService {
  private static STORAGE_KEY = 'journal_entries';

  static getEntries(): JournalEntry[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading journal entries:', error);
      return [];
    }
  }

  static saveEntries(entries: JournalEntry[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving journal entries:', error);
    }
  }

  static addEntry(entry: JournalEntry): void {
    const entries = this.getEntries();
    entries.unshift(entry);
    this.saveEntries(entries);
  }

  static updateEntry(id: string, updates: Partial<JournalEntry>): void {
    const entries = this.getEntries();
    const index = entries.findIndex(e => e.id === id);
    if (index !== -1) {
      entries[index] = { ...entries[index], ...updates };
      this.saveEntries(entries);
    }
  }

  static deleteEntry(id: string): void {
    const entries = this.getEntries();
    this.saveEntries(entries.filter(e => e.id !== id));
  }
}
