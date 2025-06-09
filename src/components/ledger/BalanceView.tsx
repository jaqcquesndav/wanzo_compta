import React from 'react';
import { Table } from '../ui/Table';
import { useAccountingStore } from '../../stores/accountingStore';
import type { Account } from '../../types/accounting';

interface BalanceViewProps {
  accounts: Array<{
    account: Account;
    debit: number;
    credit: number;
    balance: number;
  }>;
  loading?: boolean;
}

export function BalanceView({ accounts, loading }: BalanceViewProps) {
  const { mode } = useAccountingStore();

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    });
  };

  const columns = [
    {
      header: 'Code',
      accessor: (item: typeof accounts[0]) => item.account.code,
      className: 'font-mono'
    },
    {
      header: 'Libellé',
      accessor: (item: typeof accounts[0]) => item.account.name
    },
    {
      header: 'Type',
      accessor: (item: typeof accounts[0]) => ({
        asset: 'Actif',
        liability: 'Passif',
        equity: 'Capitaux propres',
        revenue: 'Produits',
        expense: 'Charges'
      }[item.account.type])
    },
    {
      header: 'Débit',
      accessor: (item: typeof accounts[0]) => formatAmount(item.debit),
      className: 'text-right'
    },
    {
      header: 'Crédit',
      accessor: (item: typeof accounts[0]) => formatAmount(item.credit),
      className: 'text-right'
    },
    {
      header: 'Solde',
      accessor: (item: typeof accounts[0]) => {
        const solde = item.balance;
        return (
          <span className={solde >= 0 ? 'text-success' : 'text-red-600'}>
            {formatAmount(Math.abs(solde))} {solde >= 0 ? 'D' : 'C'}
          </span>
        );
      },
      className: 'text-right font-medium'
    }
  ];

  const totals = accounts.reduce((acc, item) => ({
    debit: acc.debit + item.debit,
    credit: acc.credit + item.credit,
    balance: acc.balance + item.balance
  }), { debit: 0, credit: 0, balance: 0 });

  return (
    <div className="space-y-4">
      <div className="bg-primary/5 p-4 rounded-lg">
        <h3 className="font-medium">Balance {mode}</h3>
        <p className="text-sm text-gray-600">
          {mode === 'SYSCOHADA' 
            ? 'Balance selon le Système Comptable OHADA Révisé'
            : 'Balance selon les normes IFRS'
          }
        </p>
      </div>

      <Table
        columns={columns}
        data={accounts}
        loading={loading}
        emptyMessage="Aucun compte trouvé"
      />

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Débit</p>
            <p className="text-lg font-medium">{formatAmount(totals.debit)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Crédit</p>
            <p className="text-lg font-medium">{formatAmount(totals.credit)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Solde</p>
            <p className={`text-lg font-medium ${totals.balance >= 0 ? 'text-success' : 'text-red-600'}`}>
              {formatAmount(Math.abs(totals.balance))} {totals.balance >= 0 ? 'D' : 'C'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}