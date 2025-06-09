import { useState, useEffect } from 'react';
import { accountsApi } from '../services/api/endpoints/accounts';
import { IndexedDBService } from '../services/storage/IndexedDBService';
import { SyncService } from '../services/sync/SyncService';
import type { Account } from '../types/accounting';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      // Load from IndexedDB first
      const localAccounts = await IndexedDBService.getAll<Account>('accounts');
      if (localAccounts.length > 0) {
        setAccounts(localAccounts);
        setLoading(false);
      }

      // If online, fetch from API and update local storage
      if (navigator.onLine) {
        const response = await accountsApi.getAll();
        if (response.success && response.data) {
          setAccounts(response.data.data);
          // Update IndexedDB
          for (const account of response.data.data) {
            await IndexedDBService.update('accounts', account);
          }
        }
      }
    } catch (error) {
      console.error('Error loading accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addAccount = async (data: Partial<Account>): Promise<Account> => {
    const newAccount: Account = {
      id: crypto.randomUUID(),
      code: data.code!,
      name: data.name!,
      type: data.type!,
      standard: data.standard!,
      isAnalytic: data.isAnalytic || false
    };

    // Save to IndexedDB
    await IndexedDBService.add('accounts', newAccount);
    setAccounts(prev => [...prev, newAccount]);

    // Add to sync queue if offline
    if (!navigator.onLine) {
      await SyncService.addToSyncQueue({
        id: newAccount.id,
        type: 'CREATE',
        entity: 'accounts',
        data: newAccount
      });
    } else {
      // Try to sync immediately if online
      try {
        const response = await accountsApi.create(newAccount);
        if (response.success && response.data) {
          return response.data;
        }
      } catch (error) {
        console.error('Error creating account:', error);
      }
    }

    return newAccount;
  };

  return {
    accounts,
    loading,
    addAccount,
    loadAccounts
  };
}