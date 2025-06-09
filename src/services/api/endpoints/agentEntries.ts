import { ApiService } from '../ApiService';
import type { JournalEntry } from '../../../types/accounting';
import type { PaginatedResponse } from '../types';

export const agentEntriesApi = {
  // Récupérer toutes les entrées proposées par l'agent comptable
  getAll: (params?: { page?: number; pageSize?: number; status?: string }) => 
    ApiService.get<PaginatedResponse<JournalEntry>>('/agent-entries', { params }),

  // Récupérer une entrée spécifique
  getById: (id: string) => 
    ApiService.get<JournalEntry>(`/agent-entries/${id}`),

  // Valider une entrée
  validate: (id: string, updates?: Partial<JournalEntry>) => 
    ApiService.put<JournalEntry>(`/agent-entries/${id}/validate`, updates),

  // Rejeter une entrée
  reject: (id: string, reason: string) => 
    ApiService.put<void>(`/agent-entries/${id}/reject`, { reason }),

  // Valider plusieurs entrées en une seule opération
  validateBatch: (ids: string[]) => 
    ApiService.post<{ success: boolean; count: number }>('/agent-entries/validate-batch', { ids }),

  // Modifier une entrée avant validation
  update: (id: string, entry: Partial<JournalEntry>) => 
    ApiService.put<JournalEntry>(`/agent-entries/${id}`, entry),

  // Supprimer une entrée proposée
  delete: (id: string) => 
    ApiService.delete<void>(`/agent-entries/${id}`)
};
