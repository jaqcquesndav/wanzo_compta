import { Table } from '../ui/Table';
import { Card } from '../ui/Card';
import type { JournalEntry } from '../../types/accounting';
import { useCurrency } from '../../hooks/useCurrency';

interface LedgerViewProps {
  accountId: string;
  entries: JournalEntry[];
  loading?: boolean;
}

export function LedgerView({ accountId, entries, loading }: LedgerViewProps) {
  const { formatConverted } = useCurrency();
  
  const columns = [
    {
      header: 'Date',
      accessor: (entry: JournalEntry) => entry.date,
    },
    {
      header: 'N° Pièce',
      accessor: (entry: JournalEntry) => entry.reference,
    },
    {
      header: 'Libellé',
      accessor: (entry: JournalEntry) => entry.description,
    },
    {
      header: 'Débit',
      accessor: (entry: JournalEntry) => {
        const amount = entry.lines
          .filter(line => line.accountId === accountId && line.debit > 0)
          .reduce((sum, line) => sum + line.debit, 0);
        return formatConverted(amount);
      },
      className: 'text-right'
    },
    {
      header: 'Crédit',
      accessor: (entry: JournalEntry) => {
        const amount = entry.lines
          .filter(line => line.accountId === accountId && line.credit > 0)
          .reduce((sum, line) => sum + line.credit, 0);
        return formatConverted(amount);
      },
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
        
        return formatConverted(debit - credit);
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