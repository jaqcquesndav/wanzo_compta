import { useState, useEffect } from 'react';
import { treasuryApi } from '../services/api/endpoints/treasury';
import { IndexedDBService } from '../services/storage/IndexedDBService';
import { SyncService } from '../services/sync/SyncService';
import type { TreasuryAccount, Transaction } from '../types/treasury';

export function useTreasuryAccounts() {
  const [accounts, setAccounts] = useState<TreasuryAccount[]>([]);
  const [transactions, setTransactions] = useState<Record<string, Transaction[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      // Load from IndexedDB first
      const localAccounts = await IndexedDBService.getAll<TreasuryAccount>('treasury_accounts');
      if (localAccounts.length > 0) {
        setAccounts(localAccounts);
        setLoading(false);
      }

      // If online, fetch from API and update local storage
      if (navigator.onLine) {
        const response = await treasuryApi.getAccounts();
        if (response.success && response.data) {
          setAccounts(response.data);
          // Update IndexedDB
          for (const account of response.data) {
            await IndexedDBService.update('treasury_accounts', account);
          }
        }
      }
    } catch (error) {
      console.error('Error loading treasury accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTransactions = async (accountId: string) => {
    try {
      // Load from IndexedDB first
      const localTransactions = await IndexedDBService.getAll<Transaction>(`transactions_${accountId}`);
      if (localTransactions.length > 0) {
        setTransactions(prev => ({
          ...prev,
          [accountId]: localTransactions
        }));
      }

      // If online, fetch from API and update local storage
      if (navigator.onLine) {
        const response = await treasuryApi.getTransactions(accountId);
        if (response.success && response.data) {
          setTransactions(prev => ({
            ...prev,
            [accountId]: response.data.data
          }));
          // Update IndexedDB
          for (const transaction of response.data.data) {
            await IndexedDBService.update(`transactions_${accountId}`, transaction);
          }
        }
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  return {
    accounts,
    transactions,
    loading,
    loadAccounts,
    loadTransactions
  };
}