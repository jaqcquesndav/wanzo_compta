import { ApiService } from '../ApiService';
import type { Account, JournalEntry } from '../../../types/accounting';
import type { PaginatedResponse } from '../types';

export const ledgerApi = {
  getAccountBalance: (accountId: string, params?: { date?: string }) => 
    ApiService.get<{ balance: number }>(`/ledger/accounts/${accountId}/balance`),

  getAccountMovements: (accountId: string, params?: { 
    startDate?: string;
    endDate?: string;
    page?: number;
    pageSize?: number;
  }) => 
    ApiService.get<PaginatedResponse<JournalEntry>>(`/ledger/accounts/${accountId}/movements`),

  getTrialBalance: (params?: { 
    date?: string;
    mode?: 'SYSCOHADA' | 'IFRS';
  }) => 
    ApiService.get<Array<{
      account: Account;
      debit: number;
      credit: number;
      balance: number;
    }>>('/ledger/trial-balance'),

  exportBalance: (params: {
    format: 'pdf' | 'excel';
    mode: 'SYSCOHADA' | 'IFRS';
    date?: string;
  }) =>
    ApiService.get<Blob>('/ledger/export-balance', params)
};