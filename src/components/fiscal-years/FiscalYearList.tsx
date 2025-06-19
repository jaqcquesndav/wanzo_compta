import { Table, Column } from '../ui/Table';
import { Button } from '../ui/Button';
import { Calendar, Lock, Unlock, AlertCircle, CheckCircle } from 'lucide-react';
import type { FiscalYear } from '../../types/fiscal-year';

interface FiscalYearListProps {
  fiscalYears: FiscalYear[];
  onClose: (fiscalYear: FiscalYear) => void;
  onReopen: (fiscalYear: FiscalYear) => void;
  onAudit?: (fiscalYear: FiscalYear) => void;
  selectedFiscalYear?: FiscalYear | null;
  loading?: boolean;
  isAuditor?: boolean;
}

export function FiscalYearList({ 
  fiscalYears, 
  onClose, 
  onReopen,
  onAudit,
  selectedFiscalYear,
  loading,
  isAuditor
}: FiscalYearListProps) {
  const columns: Column<FiscalYear>[] = [
    {
      header: 'Code',
      accessor: 'code'
    },
    {
      header: 'Période',
      accessor: (fiscalYear: FiscalYear): string => {
        const start = new Date(fiscalYear.startDate);
        const end = new Date(fiscalYear.endDate);
        return `${start.toLocaleDateString('fr-FR')} - ${end.toLocaleDateString('fr-FR')}`;
      }
    },
    {
      header: 'Statut',
      accessor: (fiscalYear: FiscalYear): React.ReactNode => (
        <div className="space-y-1">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            fiscalYear.status === 'open'
              ? 'bg-success-light text-success-dark'
              : 'bg-tertiary-light text-tertiary-dark'
          }`}>
            {fiscalYear.status === 'open' ? 'Ouvert' : 'Clôturé'}
          </span>
          {fiscalYear.auditStatus?.isAudited && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark">
              <CheckCircle className="h-3 w-3 mr-1" />
              Audité
            </span>
          )}
        </div>
      )
    },
    {
      header: 'Audit',
      accessor: (fiscalYear: FiscalYear): React.ReactNode => {
        if (fiscalYear.auditStatus?.isAudited) {
          return (
            <div className="text-sm">
              <p className="font-medium text-primary">
                {fiscalYear.auditStatus.auditor.name}
              </p>
              <p className="text-secondary">
                {new Date(fiscalYear.auditStatus.auditedAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          );
        }
        return '-';
      }
    },
    {
      header: 'Actions',
      accessor: (fiscalYear: FiscalYear) => (
        <div className="flex space-x-2">
          {fiscalYear.status === 'open' ? (
            <Button
              variant="warning"
              size="sm"
              icon={Lock}
              onClick={() => onClose(fiscalYear)}
            >
              Clôturer
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              icon={Unlock}
              onClick={() => onReopen(fiscalYear)}
            >
              Réouvrir
            </Button>
          )}
          {onAudit && !fiscalYear.auditStatus?.isAudited && isAuditor && (
            <Button
              variant="primary"
              size="sm"
              icon={CheckCircle}
              onClick={() => onAudit(fiscalYear)}
            >
              Auditer
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-primary/5 rounded-lg p-4">
        <div className="flex items-center text-primary">
          <Calendar className="h-5 w-5 mr-2" />
          <div>
            <h3 className="text-sm font-medium">Exercices comptables</h3>
            <p className="text-sm text-gray-600">
              Gérez vos exercices comptables et leur statut
            </p>
          </div>
        </div>
      </div>

      {fiscalYears.some(fy => fy.status === 'open') && (
        <div className="bg-warning/10 rounded-lg p-4">
          <div className="flex items-center text-warning">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="text-sm">
              Vous avez des exercices ouverts. Assurez-vous de clôturer les exercices dans l'ordre chronologique.
            </p>
          </div>
        </div>
      )}

      <Table
        columns={columns}
        data={fiscalYears}
        loading={loading}
        emptyMessage="Aucun exercice trouvé"
        rowClassName={(fiscalYear) => 
          selectedFiscalYear?.id === fiscalYear.id 
            ? 'bg-primary/5 cursor-pointer' 
            : 'hover:bg-hover cursor-pointer'
        }
      />
    </div>
  );
}