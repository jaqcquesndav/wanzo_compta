import { LocalStorageService } from '../../../services/storage/LocalStorageService';
import { StorageKeys } from '../../../services/storage/StorageKeys';
import type { JournalEntry } from '../types';

const DRAFT_STORAGE_KEY = 'journal_drafts';

export async function saveDraftEntry(entry: Partial<JournalEntry>): Promise<JournalEntry> {
  try {
    // Get existing drafts
    const drafts = LocalStorageService.get<JournalEntry[]>(DRAFT_STORAGE_KEY) || [];
    
    // Create new draft with ID if it doesn't exist
    const draftEntry = {
      ...entry,
      id: entry.id || crypto.randomUUID()
    } as JournalEntry;

    // Update existing draft or add new one
    const updatedDrafts = entry.id 
      ? drafts.map(d => d.id === entry.id ? draftEntry : d)
      : [...drafts, draftEntry];

    // Save to local storage
    LocalStorageService.set(DRAFT_STORAGE_KEY, updatedDrafts);

    return draftEntry;
  } catch (error) {
    console.error('Failed to save draft:', error);
    throw new Error('Failed to save draft entry');
  }
}

export async function getDraftEntries(): Promise<JournalEntry[]> {
  return LocalStorageService.get<JournalEntry[]>(DRAFT_STORAGE_KEY) || [];
}

export async function getDraftEntry(id: string): Promise<JournalEntry | null> {
  const drafts = await getDraftEntries();
  return drafts.find(draft => draft.id === id) || null;
}

export async function deleteDraftEntry(id: string): Promise<void> {
  const drafts = await getDraftEntries();
  const updatedDrafts = drafts.filter(draft => draft.id !== id);
  LocalStorageService.set(DRAFT_STORAGE_KEY, updatedDrafts);
}