import React from 'react';
import { Table } from '../ui/Table';
import type { Transaction } from '../../types/treasury';

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
}

export function TransactionList({ transactions, loading }: TransactionListProps) {
  const columns = [
    {
      header: 'Date',
      accessor: 'date',
    },
    {
      header: 'Description',
      accessor: 'description',
    },
    {
      header: 'Type',
      accessor: (transaction: Transaction) => (
        <span className={transaction.type === 'credit' ? 'text-success' : 'text-red-600'}>
          {transaction.type === 'credit' ? 'Crédit' : 'Débit'}
        </span>
      ),
    },
    {
      header: 'Montant',
      accessor: (transaction: Transaction) => (
        <span className={transaction.type === 'credit' ? 'text-success' : 'text-red-600'}>
          {transaction.type === 'credit' ? '+' : '-'}
          {transaction.amount.toLocaleString('fr-FR', { 
            style: 'currency', 
            currency: 'XOF' 
          })}
        </span>
      ),
      className: 'text-right',
    },
    {
      header: 'Solde',
      accessor: (transaction: Transaction) => (
        transaction.balance.toLocaleString('fr-FR', { 
          style: 'currency', 
          currency: 'XOF' 
        })
      ),
      className: 'text-right font-medium',
    },
  ];

  return (
    <Table
      columns={columns}
      data={transactions}
      loading={loading}
      emptyMessage="Aucune transaction trouvée"
    />
  );
}