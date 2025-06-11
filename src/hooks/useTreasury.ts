import { useState, useEffect } from 'react';
import type { TreasuryAccount, TreasuryBalance } from '../types/treasury';
import { type CurrencyCode } from '../config/currency';

export function useTreasury() {
  const [accounts, setAccounts] = useState<TreasuryAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des comptes
    const mockAccounts: TreasuryAccount[] = [
      {
        id: '1',
        type: 'bank',
        provider: 'BICIS',
        bankName: 'BICIS',
        accountNumber: 'SN012 00001 00000000000001',
        balance: 15000000,
        currency: 'CDF',
        status: 'active',
        lastReconciliation: '2024-03-01'
      },
      {
        id: '2',
        type: 'microfinance',
        provider: 'SMICO',
        bankName: 'SMICO Microfinance',
        accountNumber: 'MF001-0001-00001',
        balance: 5000000,
        currency: 'CDF',
        status: 'active'
      },
      {
        id: '3',
        type: 'cooperative',
        provider: 'Bonne Moisson',
        bankName: 'COOPEC Bonne Moisson',
        accountNumber: 'COOP-2024-001',
        balance: 3000000,
        currency: 'CDF',
        status: 'active'
      },
      {
        id: '4',
        type: 'vsla',
        provider: 'AVEC Solidarité',
        bankName: 'AVEC Solidarité',
        accountNumber: 'AVEC-2024-001',
        balance: 1000000,
        currency: 'CDF',
        status: 'active'
      }
    ];

    setAccounts(mockAccounts);
    setLoading(false);
  }, []);

  const getBalance = (type: 'bank' | 'all'): TreasuryBalance => {
    const filteredAccounts = type === 'all' 
      ? accounts 
      : accounts.filter(a => a.type === type);

    const total = filteredAccounts.reduce((sum, acc) => sum + acc.balance, 0);

    return {
      opening: total * 0.9, // Simuler le solde d'ouverture
      current: total,
      projected: total * 1.1, // Simuler le solde prévisionnel
      currency: 'CDF' as CurrencyCode
    };
  };

  return {
    accounts,
    loading,
    getBalance
  };
}