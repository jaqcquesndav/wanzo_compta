import { useState } from 'react';
import { Table } from '../ui/Table';
import { Button } from '../ui/Button';
import { Check, Eye, Edit2, Trash2, CheckSquare } from 'lucide-react';
import { JOURNAL_TYPES } from '../../config/accounting';
import type { JournalEntry } from '../../types/accounting';
import { useCurrency } from '../../hooks/useCurrency';

interface AgentEntryListProps {
  entries: JournalEntry[];
  onView: (entry: JournalEntry) => void;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (entry: JournalEntry) => void;
  onValidate: (entry: JournalEntry) => void;
  onValidateAll: (entries: JournalEntry[]) => void;
  loading?: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function AgentEntryList({
  entries,
  onView,
  onEdit,
  onDelete,
  onValidate,
  onValidateAll,
  loading,
  page,
  totalPages,
  onPageChange
}: AgentEntryListProps) {  const [selectedEntries, setSelectedEntries] = useState<JournalEntry[]>([]);
  const isAllSelected = entries.length > 0 && selectedEntries.length === entries.length;
  const { formatConverted } = useCurrency();
  
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedEntries([]);
    } else {
      setSelectedEntries([...entries]);
    }
  };

  const toggleSelectEntry = (entry: JournalEntry) => {
    if (selectedEntries.find(e => e.id === entry.id)) {
      setSelectedEntries(selectedEntries.filter(e => e.id !== entry.id));
    } else {
      setSelectedEntries([...selectedEntries, entry]);
    }
  };
  const columns = [
    {
      header: 'Sélection',
      accessor: (entry: JournalEntry) => (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={Boolean(selectedEntries.find(e => e.id === entry.id))}
            onChange={() => toggleSelectEntry(entry)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
        </div>
      ),
      className: 'w-10'
    },
    {
      header: 'Date',
      accessor: (entry: JournalEntry) => new Date(entry.date).toLocaleDateString('fr-FR')
    },    {
      header: 'N° Pièce',
      accessor: (entry: JournalEntry) => entry.reference
    },{
      header: 'Journal',
      accessor: (entry: JournalEntry) => {
        // Mapping between journalType and JOURNAL_TYPES constant keys
        const journalTypeMapping: { [key: string]: keyof typeof JOURNAL_TYPES } = {
          'sales': 'SALES',
          'purchases': 'PURCHASE',
          'bank': 'BANK',
          'cash': 'CASH',
          'general': 'GENERAL'
        };
        
        const mappedType = journalTypeMapping[entry.journalType];
        return mappedType ? JOURNAL_TYPES[mappedType].label : entry.journalType;
      }
    },    {
      header: 'Libellé',
      accessor: (entry: JournalEntry) => entry.description
    },    {
      header: 'Débit',
      accessor: (entry: JournalEntry) => formatConverted(entry.totalDebit),
      className: 'text-right'
    },
    {
      header: 'Crédit',
      accessor: (entry: JournalEntry) => formatConverted(entry.totalCredit),
      className: 'text-right'
    },
    {
      header: 'Actions',
      accessor: (entry: JournalEntry) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Eye}
            onClick={() => onView(entry)}
          >
            Voir
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => onEdit(entry)}
          >
            Modifier
          </Button>
          <Button
            variant="success"
            size="sm"
            icon={Check}
            onClick={() => onValidate(entry)}
          >
            Valider
          </Button>
          <Button
            variant="warning"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(entry)}
          >
            Supprimer
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Écritures proposées par l'agent comptable
        </h3>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleSelectAll}
              className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
              id="select-all"
            />
            <label htmlFor="select-all">Tout sélectionner</label>
          </div>

          {selectedEntries.length > 0 && (
            <Button
              variant="success"
              icon={CheckSquare}
              onClick={() => {
                onValidateAll(selectedEntries);
                setSelectedEntries([]);
              }}
            >
              Valider {selectedEntries.length} écritures sélectionnées
            </Button>
          )}
        </div>
      </div>

      <Table
        columns={columns}
        data={entries}
        loading={loading}
        emptyMessage="Aucune écriture proposée par l'agent comptable"
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <Button
              variant="secondary"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              Précédent
            </Button>
            <Button
              variant="secondary"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              Suivant
            </Button>
          </div>
          
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Page <span className="font-medium">{page}</span> sur{' '}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => onPageChange(page - 1)}
                  disabled={page === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    page === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="sr-only">Précédent</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      page === pageNum
                        ? 'z-10 bg-primary text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                
                <button
                  onClick={() => onPageChange(page + 1)}
                  disabled={page === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="sr-only">Suivant</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
