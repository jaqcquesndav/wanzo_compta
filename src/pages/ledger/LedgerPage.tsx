import { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AccountList } from '../../components/accounting/AccountList';
import { LedgerView } from '../../components/accounting/LedgerView';
import { BalanceView } from '../../components/ledger/BalanceView';
import { AccountEditModal } from '../../components/ledger/AccountEditModal';
import { LedgerFilters, type LedgerFilters as Filters } from '../../components/accounting/LedgerFilters';
import { useLedger } from '../../hooks/useLedger';
import { useAccountAccess } from '../../hooks/useAccountAccess';
import { useAccountingStore } from '../../stores/accountingStore';
import type { Account } from '../../types/accounting';

export function LedgerPage() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    accountType: 'all',
    startDate: '',
    endDate: '',
    balanceType: 'all'
  });

  const { 
    trialBalance, 
    accountMovements,
    loading,
    loadAccountMovements,
    addAccount,
    updateAccount,
    deleteAccount
  } = useLedger();

  const { canEditAccounts, canViewBalance } = useAccountAccess();
  const { mode } = useAccountingStore();

  const handleAccountSelect = async (account: Account) => {
    setSelectedAccount(account);
    await loadAccountMovements(account.id);
  };

  const handleAddAccount = async (data: Partial<Account>) => {
    try {
      await addAccount({ ...data, standard: mode });
      setShowAccountForm(false);
    } catch (error) {
      console.error('Failed to add account:', error);
    }
  };

  const handleUpdateAccount = async (data: Partial<Account>) => {
    if (!selectedAccount) return;
    try {
      await updateAccount(selectedAccount.id, data);
      setShowAccountForm(false);
      setSelectedAccount(null);
    } catch (error) {
      console.error('Failed to update account:', error);
    }
  };

  const handleDeleteAccount = async (account: Account) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le compte ${account.code} - ${account.name} ?`)) {
      try {
        await deleteAccount(account.id);
        if (selectedAccount?.id === account.id) {
          setSelectedAccount(null);
        }
      } catch (error) {
        console.error('Failed to delete account:', error);
      }
    }
  };

  const filteredAccounts = trialBalance
    .map(item => item.account)
    .filter(account => {
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (!account.code.includes(searchTerm) && 
            !account.name.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      if (filters.accountType !== 'all' && account.type !== filters.accountType) {
        return false;
      }

      if (filters.balanceType !== 'all') {
        const balance = trialBalance.find(item => item.account.id === account.id);
        if (!balance) return false;

        const netBalance = balance.debit - balance.credit;
        if (filters.balanceType === 'debit' && netBalance <= 0) return false;
        if (filters.balanceType === 'credit' && netBalance >= 0) return false;
      }

      return true;
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">Grand Livre</h1>
        <div className="flex space-x-3">
          {canViewBalance && (
            <Button
              variant="secondary"
              icon={FileText}
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? 'Voir le grand livre' : 'Voir la balance'}
            </Button>
          )}
          {canEditAccounts && (
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => setShowAccountForm(true)}
            >
              Nouveau Compte
            </Button>
          )}
        </div>
      </div>

      <LedgerFilters onFilterChange={setFilters} />

      {showBalance ? (
        <Card title="Balance">
          <BalanceView accounts={trialBalance} loading={loading} />
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Liste des comptes" className="lg:col-span-1">
            <AccountList
              accounts={filteredAccounts}
              onAdd={() => canEditAccounts && setShowAccountForm(true)}
              onEdit={(account) => {
                if (canEditAccounts) {
                  setSelectedAccount(account);
                  setShowAccountForm(true);
                }
              }}
              onDelete={canEditAccounts ? handleDeleteAccount : undefined}
              onSelect={handleAccountSelect}
              selectedAccount={selectedAccount}
              loading={loading}
            />
          </Card>

          <div className="lg:col-span-2">
            {selectedAccount ? (
              <LedgerView
                accountId={selectedAccount.id}
                entries={accountMovements[selectedAccount.id] || []}
                loading={loading}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-text-tertiary">
                <p>Sélectionnez un compte pour voir ses mouvements</p>
              </div>
            )}
          </div>
        </div>
      )}

      <AccountEditModal
        isOpen={showAccountForm}
        onClose={() => {
          setShowAccountForm(false);
          setSelectedAccount(null);
        }}
        account={selectedAccount}
        onSave={selectedAccount ? handleUpdateAccount : handleAddAccount}
      />
    </div>
  );
}