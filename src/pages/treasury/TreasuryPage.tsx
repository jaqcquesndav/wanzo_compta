import React, { useState } from 'react';
import { TreasuryOverview } from '../../components/treasury/TreasuryOverview';
import { TreasuryAccountList } from '../../components/treasury/accounts/TreasuryAccountList';
import { TransactionList } from '../../components/treasury/TransactionList';
import { Modal } from '../../components/ui/Modal';
import { useTreasury } from '../../hooks/useTreasury';
import type { TreasuryAccount } from '../../types/treasury';

export function TreasuryPage() {
  const { accounts, loading } = useTreasury();
  const [selectedAccount, setSelectedAccount] = useState<TreasuryAccount | null>(null);
  const [showTransactions, setShowTransactions] = useState(false);

  // Mock transactions data
  const transactions = [
    {
      id: '1',
      date: '2024-03-01',
      description: 'Virement client ABC',
      type: 'credit',
      amount: 1500000,
      balance: 15000000
    },
    {
      id: '2',
      date: '2024-03-01',
      description: 'Paiement fournisseur XYZ',
      type: 'debit',
      amount: 500000,
      balance: 13500000
    }
  ];

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Trésorerie</h1>
      </div>

      <TreasuryOverview />

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Comptes de trésorerie
        </h2>
        <TreasuryAccountList
          accounts={accounts}
          onViewDetails={(account) => {
            setSelectedAccount(account);
            setShowTransactions(true);
          }}
        />
      </div>

      <Modal
        isOpen={showTransactions}
        onClose={() => setShowTransactions(false)}
        title={`Transactions - ${selectedAccount?.provider}`}
        size="xl"
      >
        <TransactionList transactions={transactions} />
      </Modal>
    </div>
  );
}