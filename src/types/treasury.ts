// Étendre les types existants
export type TreasuryType = 'bank' | 'cash' | 'microfinance' | 'cooperative' | 'vsla'; // vsla = AVEC

export interface TreasuryAccount extends BankAccount {
  type: TreasuryType;
  provider: string;
  lastReconciliation?: string;
  status: 'active' | 'inactive';
}

export interface TreasuryBalance {
  opening: number;
  current: number;
  projected: number;
  currency: string;
}

export interface TreasuryProvider {
  id: string;
  name: string;
  type: TreasuryType;
  logo?: string;
}