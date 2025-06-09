import React from 'react';
import { Table } from '../../../components/ui/Table';
import { Button } from '../../../components/ui/Button';
import { Download, Eye } from 'lucide-react';
import { DECLARATION_TYPES } from '../../../types/declarations';
import type { Declaration } from '../../../types/declarations';

interface DeclarationListProps {
  declarations: Declaration[];
  onPreview: (declaration: Declaration) => void;
  onDownload: (declaration: Declaration) => void;
}

export function DeclarationList({ declarations, onPreview, onDownload }: DeclarationListProps) {
  const columns = [
    {
      header: 'Type',
      accessor: (declaration: Declaration) => DECLARATION_TYPES[declaration.type].label
    },
    {
      header: 'Période',
      accessor: (declaration: Declaration) => {
        const date = new Date(declaration.period);
        return declaration.periodicity === 'annual'
          ? date.getFullYear()
          : date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      }
    },
    {
      header: 'Date limite',
      accessor: (declaration: Declaration) => (
        new Date(declaration.dueDate).toLocaleDateString('fr-FR')
      )
    },
    {
      header: 'Montant',
      accessor: (declaration: Declaration) => (
        declaration.amount.toLocaleString('fr-CD', { 
          style: 'currency', 
          currency: 'CDF' 
        })
      ),
      className: 'text-right'
    },
    {
      header: 'Statut',
      accessor: (declaration: Declaration) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          declaration.status === 'pending' 
            ? 'bg-warning text-white'
            : declaration.status === 'submitted'
            ? 'bg-success text-white'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {
            {
              draft: 'Brouillon',
              pending: 'À soumettre',
              submitted: 'Soumise'
            }[declaration.status]
          }
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: (declaration: Declaration) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Eye}
            onClick={() => onPreview(declaration)}
          >
            Voir
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => onDownload(declaration)}
            disabled={declaration.status === 'draft'}
          >
            Télécharger
          </Button>
        </div>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      data={declarations}
      emptyMessage="Aucune déclaration trouvée"
    />
  );
}