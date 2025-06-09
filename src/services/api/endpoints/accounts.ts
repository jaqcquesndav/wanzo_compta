import { ApiService } from '../ApiService';
import type { Account } from '../../../types/accounting';
import type { PaginatedResponse } from '../types';

export const accountsApi = {
  getAll: (params?: { page?: number; pageSize?: number }) => 
    ApiService.get<PaginatedResponse<Account>>('/accounts'),

  getById: (id: string) => 
    ApiService.get<Account>(`/accounts/${id}`),

  create: (account: Partial<Account>) => 
    ApiService.post<Account>('/accounts', account),

  update: (id: string, account: Partial<Account>) => 
    ApiService.put<Account>(`/accounts/${id}`, account),

  delete: (id: string) => 
    ApiService.delete<void>(`/accounts/${id}`)
};