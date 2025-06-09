import { useState, useEffect } from 'react';
import { IndexedDBService } from '../services/storage/IndexedDBService';
import { SyncService } from '../services/sync/SyncService';
import { ledgerApi } from '../services/api/endpoints/ledger';
import { mockAccounts, mockJournalEntries } from '../data/mockData';
import type { Account, JournalEntry } from '../types/accounting';

interface AccountBalance {
  account: Account;
  debit: number;
  credit: number;
  balance: number;
}

export function useLedger() {
  const [trialBalance, setTrialBalance] = useState<AccountBalance[]>([]);
  const [accountMovements, setAccountMovements] = useState<Record<string, JournalEntry[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrialBalance();
  }, []);

  const loadTrialBalance = async () => {
    try {
      setLoading(true);
      // Charger depuis IndexedDB d'abord
      const localAccounts = await IndexedDBService.getAll<Account>('accounts');
      const localEntries = await IndexedDBService.getAll<JournalEntry>('journal_entries');

      // Si pas de données locales, utiliser les données de démo
      const accounts = localAccounts.length > 0 ? localAccounts : mockAccounts;
      const entries = localEntries.length > 0 ? localEntries : mockJournalEntries;

      // Calculer la balance
      const balance = accounts.map(account => {
        const accountEntries = entries.filter(entry =>
          entry.lines.some(line => line.accountId === account.id)
        );

        const totals = accountEntries.reduce((acc, entry) => {
          entry.lines.forEach(line => {
            if (line.accountId === account.id) {
              acc.debit += line.debit || 0;
              acc.credit += line.credit || 0;
            }
          });
          return acc;
        }, { debit: 0, credit: 0 });

        return {
          account,
          debit: totals.debit,
          credit: totals.credit,
          balance: totals.debit - totals.credit
        };
      });

      setTrialBalance(balance);

      // Si en ligne, synchroniser avec l'API
      if (navigator.onLine) {
        const response = await ledgerApi.getTrialBalance();
        if (response.success && response.data) {
          setTrialBalance(response.data);
          // Mettre à jour IndexedDB
          for (const balance of response.data) {
            await IndexedDBService.update('accounts', balance.account);
          }
        }
      }
    } catch (error) {
      console.error('Error loading trial balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAccountMovements = async (accountId: string) => {
    try {
      setLoading(true);
      // Charger depuis IndexedDB d'abord
      const localEntries = await IndexedDBService.getAll<JournalEntry>('journal_entries');
      
      // Filtrer les écritures pour ce compte
      const accountEntries = (localEntries.length > 0 ? localEntries : mockJournalEntries)
        .filter(entry => entry.lines.some(line => line.accountId === accountId));

      setAccountMovements(prev => ({
        ...prev,
        [accountId]: accountEntries
      }));

      // Si en ligne, synchroniser avec l'API
      if (navigator.onLine) {
        const response = await ledgerApi.getAccountMovements(accountId);
        if (response.success && response.data) {
          setAccountMovements(prev => ({
            ...prev,
            [accountId]: response.data.data
          }));
          // Mettre à jour IndexedDB
          for (const entry of response.data.data) {
            await IndexedDBService.update('journal_entries', entry);
          }
        }
      }
    } catch (error) {
      console.error('Error loading account movements:', error);
    } finally {
      setLoading(false);
    }
  };

  const addAccount = async (data: Partial<Account>): Promise<void> => {
    try {
      const newAccount: Account = {
        id: crypto.randomUUID(),
        code: data.code!,
        name: data.name!,
        type: data.type!,
        standard: data.standard || 'SYSCOHADA',
        isAnalytic: data.isAnalytic || false
      };

      await IndexedDBService.add('accounts', newAccount);
      await loadTrialBalance();

      if (navigator.onLine) {
        await SyncService.addToSyncQueue({
          id: newAccount.id,
          type: 'CREATE',
          entity: 'accounts',
          data: newAccount
        });
      }
    } catch (error) {
      console.error('Failed to add account:', error);
      throw error;
    }
  };

  const updateAccount = async (id: string, data: Partial<Account>): Promise<void> => {
    try {
      const account = trialBalance.find(b => b.account.id === id)?.account;
      if (!account) throw new Error('Account not found');

      const updatedAccount = { ...account, ...data };
      await IndexedDBService.update('accounts', updatedAccount);
      await loadTrialBalance();

      if (navigator.onLine) {
        await SyncService.addToSyncQueue({
          id: updatedAccount.id,
          type: 'UPDATE',
          entity: 'accounts',
          data: updatedAccount
        });
      }
    } catch (error) {
      console.error('Failed to update account:', error);
      throw error;
    }
  };

  const deleteAccount = async (id: string): Promise<void> => {
    try {
      await IndexedDBService.delete('accounts', id);
      await loadTrialBalance();

      if (navigator.onLine) {
        await SyncService.addToSyncQueue({
          id,
          type: 'DELETE',
          entity: 'accounts',
          data: { id }
        });
      }
    } catch (error) {
      console.error('Failed to delete account:', error);
      throw error;
    }
  };

  return {
    trialBalance,
    accountMovements,
    loading,
    loadTrialBalance,
    loadAccountMovements,
    addAccount,
    updateAccount,
    deleteAccount
  };
}