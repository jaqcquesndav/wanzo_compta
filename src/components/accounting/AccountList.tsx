import { Table, Column } from '../ui/Table';
import { Button } from '../ui/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { Account } from '../../types/accounting';

interface AccountListProps {
  accounts: Account[];
  onAdd: () => void;
  onEdit: (account: Account) => void;
  onDelete: ((account: Account) => void) | undefined;
  onSelect?: (account: Account) => void;
  selectedAccount?: Account | null;
  loading?: boolean;
}

export function AccountList({ 
  accounts, 
  onAdd, 
  onEdit, 
  onDelete, 
  onSelect,
  selectedAccount,
  loading 
}: AccountListProps) {
  const columns: Column<Account>[] = [
    {
      header: 'Code',
      accessor: 'code',
      className: 'font-mono'
    },
    {
      header: 'Nom',
      accessor: 'name'
    },
    {
      header: 'Type',
      accessor: (account: Account) => ({
        asset: 'Actif',
        liability: 'Passif',
        equity: 'Capitaux propres',
        revenue: 'Produits',
        expense: 'Charges'
      }[account.type])
    },
    {
      header: 'Actions',
      accessor: (account: Account) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(account);
            }}
          >
            Modifier
          </Button>
          <Button
            variant="warning"
            size="sm"
            icon={Trash2}
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) {
                onDelete(account);
              }
            }}
          >
            Supprimer
          </Button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="primary"
          icon={Plus}
          onClick={onAdd}
        >
          Nouveau Compte
        </Button>
      </div>

      <Table
        columns={columns}
        data={accounts}
        loading={loading}
        emptyMessage="Aucun compte trouvé"
        onRowClick={onSelect ? (account) => onSelect(account as Account) : undefined}
        rowClassName={(account) => 
          selectedAccount?.id === account.id 
            ? 'bg-primary/5 cursor-pointer' 
            : 'hover:bg-hover cursor-pointer'
        }
      />
    </div>
  );
}