import React from 'react';
import { Table } from '../ui/Table';
import { Card } from '../ui/Card';
import type { JournalEntry } from '../../types/accounting';

interface LedgerViewProps {
  accountId: string;
  entries: JournalEntry[];
  loading?: boolean;
}

export function LedgerView({ accountId, entries, loading }: LedgerViewProps) {
  const columns = [
    {
      header: 'Date',
      accessor: 'date',
    },
    {
      header: 'N° Pièce',
      accessor: 'reference',
    },
    {
      header: 'Libellé',
      accessor: 'description',
    },
    {
      header: 'Débit',
      accessor: (entry: JournalEntry) => 
        entry.lines
          .filter(line => line.accountId === accountId && line.debit > 0)
          .reduce((sum, line) => sum + line.debit, 0)
          .toFixed(2),
      className: 'text-right'
    },
    {
      header: 'Crédit',
      accessor: (entry: JournalEntry) => 
        entry.lines
          .filter(line => line.accountId === accountId && line.credit > 0)
          .reduce((sum, line) => sum + line.credit, 0)
          .toFixed(2),
      className: 'text-right'
    },
    {
      header: 'Solde',
      accessor: (entry: JournalEntry) => {
        const debit = entry.lines
          .filter(line => line.accountId === accountId && line.debit > 0)
          .reduce((sum, line) => sum + line.debit, 0);
        
        const credit = entry.lines
          .filter(line => line.accountId === accountId && line.credit > 0)
          .reduce((sum, line) => sum + line.credit, 0);
        
        return (debit - credit).toFixed(2);
      },
      className: 'text-right font-medium'
    }
  ];

  return (
    <Card title="Mouvements du compte">
      <Table
        columns={columns}
        data={entries}
        loading={loading}
        emptyMessage="Aucun mouvement trouvé"
      />
    </Card>
  );
}