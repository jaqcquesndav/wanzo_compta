import { ApiService } from '../ApiService';
import type { Account, JournalEntry } from '../../../types/accounting';
import type { PaginatedResponse } from '../types';
import { CurrencyCode } from '../../../config/currency';

export const ledgerApi = {
  getAccountBalance: (accountId: string, params?: { 
    date?: string;
    currency?: CurrencyCode;
  }) => 
    ApiService.get<{ balance: number }>(`/ledger/accounts/${accountId}/balance`, params),

  getAccountMovements: (accountId: string, params?: { 
    startDate?: string;
    endDate?: string;
    page?: number;
    pageSize?: number;
    currency?: CurrencyCode;
  }) => 
    ApiService.get<PaginatedResponse<JournalEntry>>(`/ledger/accounts/${accountId}/movements`, params),

  getTrialBalance: (params?: { 
    date?: string;
    mode?: 'SYSCOHADA' | 'IFRS';
    currency?: CurrencyCode;
  }) => 
    ApiService.get<Array<{
      account: Account;
      debit: number;
      credit: number;
      balance: number;
    }>>('/ledger/trial-balance', params),

  exportBalance: (params: {
    format: 'pdf' | 'excel';
    mode: 'SYSCOHADA' | 'IFRS';
    date?: string;
    currency?: CurrencyCode;
  }) =>
    ApiService.get<Blob>('/ledger/export-balance', params)
};