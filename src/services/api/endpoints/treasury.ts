import { ApiService } from '../ApiService';
import type { TreasuryAccount, Transaction } from '../../../types/treasury';
import type { PaginatedResponse } from '../types';

export const treasuryApi = {
  getAccounts: () => 
    ApiService.get<TreasuryAccount[]>('/treasury/accounts'),

  getTransactions: (accountId: string, params?: { page?: number; pageSize?: number }) => 
    ApiService.get<PaginatedResponse<Transaction>>(`/treasury/accounts/${accountId}/transactions`),

  reconcile: (accountId: string, data: { date: string; balance: number }) => 
    ApiService.post<void>(`/treasury/accounts/${accountId}/reconcile`, data),

  importTransactions: (accountId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return ApiService.post<void>(`/treasury/accounts/${accountId}/import`, formData);
  }
};