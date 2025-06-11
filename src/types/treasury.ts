import { CurrencyCode } from '../config/currency';

export interface TreasuryAccount {
  id: string;
  type: 'bank' | 'microfinance' | 'cooperative' | 'vsla';
  provider: string;
  bankName: string;
  accountNumber: string;
  balance: number;
  currency: CurrencyCode;
  status: 'active' | 'inactive' | 'pending';
  lastReconciliation?: string;
}

export interface TreasuryBalance {
  opening: number;
  current: number;
  projected: number;
  currency: CurrencyCode;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  reference?: string;
  status?: 'pending' | 'completed' | 'reconciled';
}
