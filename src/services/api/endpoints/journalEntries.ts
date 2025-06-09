import { ApiService } from '../ApiService';
import type { JournalEntry } from '../../../types/accounting';
import type { PaginatedResponse } from '../types';

export const journalEntriesApi = {
  getAll: (params?: { page?: number; pageSize?: number }) => 
    ApiService.get<PaginatedResponse<JournalEntry>>('/journal-entries'),

  getById: (id: string) => 
    ApiService.get<JournalEntry>(`/journal-entries/${id}`),

  create: (entry: Partial<JournalEntry>) => 
    ApiService.post<JournalEntry>('/journal-entries', entry),

  update: (id: string, entry: Partial<JournalEntry>) => 
    ApiService.put<JournalEntry>(`/journal-entries/${id}`, entry),

  delete: (id: string) => 
    ApiService.delete<void>(`/journal-entries/${id}`)
};