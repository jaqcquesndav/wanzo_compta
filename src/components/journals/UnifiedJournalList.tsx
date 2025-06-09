import { useState, useEffect } from 'react';
import { Table } from '../ui/Table';
import { Button } from '../ui/Button';
import { Check, Eye, Edit2, Trash2, CheckSquare, MoreVertical, FileText, FileSpreadsheet, Download, Plus } from 'lucide-react';
import { JOURNAL_TYPES } from '../../config/accounting';
import type { JournalEntry } from '../../types/accounting';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';
import { Switch } from '../ui/Switch';

interface UnifiedJournalListProps {
  entries: JournalEntry[];
  agentEntries: JournalEntry[];
  onView: (entry: JournalEntry) => void;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (entry: JournalEntry) => void;
  onValidate?: (entry: JournalEntry) => void;
  onValidateAll?: (entries: JournalEntry[]) => void;
  onExport: (format: 'pdf' | 'excel' | 'csv') => void;  loading?: boolean;  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function UnifiedJournalList({
  entries,
  agentEntries,
  onView,
  onEdit,
  onDelete,
  onValidate,
  onValidateAll,
  onExport,  
  loading,
  page,
  totalPages,
  onPageChange
}: UnifiedJournalListProps) {
  const [selectedEntries, setSelectedEntries] = useState<JournalEntry[]>([]);
  const [showAgentEntries, setShowAgentEntries] = useState(true);
    // Combine entries and agent entries for unified display
  const allEntries = [...entries];
  if (showAgentEntries) {
    allEntries.push(...agentEntries);
  }

  const isAllSelected = agentEntries.length > 0 && selectedEntries.length === agentEntries.length;

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    });
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedEntries([]);
    } else {
      setSelectedEntries([...agentEntries]);
    }
  };

  const toggleSelectEntry = (entry: JournalEntry) => {
    if (selectedEntries.find(e => e.id === entry.id)) {
      setSelectedEntries(selectedEntries.filter(e => e.id !== entry.id));
    } else {
      setSelectedEntries([...selectedEntries, entry]);
    }
  };

  const getRowClassName = (entry: JournalEntry) => {
    if (entry.source === 'agent' && entry.validationStatus === 'pending') {
      return 'bg-orange-50 hover:bg-orange-100';
    }
    
    if (entry.status === 'posted') {
      return 'bg-gray-50 hover:bg-gray-100';
    }
    
    if (entry.status === 'approved') {
      return 'bg-green-50 hover:bg-green-100';
    }
    
    return '';
  };

  const columns = [
    {
      header: 'Date',
      accessor: (entry: JournalEntry) => new Date(entry.date).toLocaleDateString('fr-FR')
    },
    {
      header: 'N° Pièce',
      accessor: (entry: JournalEntry) => entry.reference
    },
    {
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
    },
    {
      header: 'Libellé',
      accessor: (entry: JournalEntry) => (
        <div className="flex items-center">
          {entry.source === 'agent' && (
            <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800 mr-2">
              ADHA
            </span>
          )}
          {entry.description}
        </div>
      )
    },
    {
      header: 'Débit',
      accessor: (entry: JournalEntry) => formatAmount(entry.totalDebit),
      className: 'text-right'
    },
    {
      header: 'Crédit',
      accessor: (entry: JournalEntry) => formatAmount(entry.totalCredit),
      className: 'text-right'
    },
    {
      header: 'Actions',
      accessor: (entry: JournalEntry) => (
        <div className="flex justify-end">
          {entry.source === 'agent' && entry.validationStatus === 'pending' ? (
            // Afficher les boutons de validation pour les entrées de l'agent
            <div className="flex space-x-2">
              <Button
                variant="success"
                size="sm"
                icon={Check}
                onClick={() => onValidate && onValidate(entry)}
              >
                Valider
              </Button>
              <Popover>
                <PopoverTrigger>
                  <Button variant="secondary" size="sm" icon={MoreVertical}>
                    <span className="sr-only">Plus d'options</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="flex flex-col space-y-1">
                    <Button
                      variant="tertiary"
                      size="sm"
                      icon={Eye}
                      onClick={() => onView(entry)}
                      className="justify-start"
                    >
                      Voir
                    </Button>
                    <Button
                      variant="tertiary"
                      size="sm"
                      icon={Edit2}
                      onClick={() => onEdit(entry)}
                      className="justify-start"
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="tertiary"
                      size="sm"
                      icon={Trash2}
                      onClick={() => onDelete(entry)}
                      className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Supprimer
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            // Afficher les actions standard pour les entrées normales
            <Popover>
              <PopoverTrigger>
                <Button variant="secondary" size="sm" icon={MoreVertical}>
                  <span className="sr-only">Plus d'options</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-1 overflow-hidden">
                <div className="flex flex-col space-y-1">
                  <Button
                    variant="tertiary"
                    size="sm"
                    icon={Eye}
                    onClick={() => onView(entry)}
                    className="justify-start"
                  >
                    Voir
                  </Button>
                  <Button
                    variant="tertiary"
                    size="sm"
                    icon={Edit2}
                    onClick={() => onEdit(entry)}
                    disabled={entry.status === 'posted'}
                    className="justify-start"
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="tertiary"
                    size="sm"
                    icon={Trash2}
                    onClick={() => onDelete(entry)}
                    disabled={entry.status === 'posted'}
                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Supprimer
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      )
    }
  ];
  // Si des entrées d'agent sont sélectionnées, ajouter une colonne de sélection
  if (agentEntries.length > 0 && showAgentEntries) {
    columns.unshift({
      header: 'Sélection',
      accessor: (entry: JournalEntry) => (
        entry.source === 'agent' && entry.validationStatus === 'pending' ? (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={Boolean(selectedEntries.find(e => e.id === entry.id))}
              onChange={() => toggleSelectEntry(entry)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
          </div>
        ) : null
      ),
      className: 'w-10'
    } as any); // Type assertion to any to avoid TypeScript errors
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-medium text-gray-900">
            Journal comptable
          </h3>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="show-agent-entries" 
              checked={showAgentEntries} 
              onCheckedChange={setShowAgentEntries}
            />
            <label htmlFor="show-agent-entries" className="text-sm text-gray-700">
              Afficher les écritures de l'agent
              {agentEntries.length > 0 && (
                <span className="ml-1 inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                  {agentEntries.length}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="flex items-center space-x-2">          {showAgentEntries && selectedEntries.length > 0 && (
            <Button
              variant="success"
              icon={CheckSquare}
              onClick={() => onValidateAll && onValidateAll(selectedEntries)}            >
              Valider {selectedEntries.length} sélectionnées
            </Button>
          )}
          
            <Popover>
            <PopoverTrigger>              <Button variant="secondary" icon={FileText}>
                Exporter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1 overflow-hidden">
              <div className="flex flex-col space-y-1">
                <Button
                  variant="tertiary"
                  size="sm"
                  icon={FileText}
                  onClick={() => onExport('pdf')}
                  className="justify-start"
                >
                  Export PDF
                </Button>
                <Button
                  variant="tertiary"
                  size="sm"
                  icon={FileSpreadsheet}
                  onClick={() => onExport('excel')}
                  className="justify-start"
                >
                  Export Excel
                </Button>
                <Button
                  variant="tertiary"
                  size="sm"
                  icon={Download}
                  onClick={() => onExport('csv')}
                  className="justify-start"
                >
                  Export CSV
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {showAgentEntries && agentEntries.length > 0 && (
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleSelectAll}
            className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
            id="select-all"
          />
          <label htmlFor="select-all" className="text-sm">
            Tout sélectionner ({agentEntries.length} écritures ADHA)
          </label>
        </div>
      )}

      <Table
        columns={columns}
        data={allEntries}
        loading={loading}
        emptyMessage="Aucune écriture trouvée"
        rowClassName={getRowClassName}
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
