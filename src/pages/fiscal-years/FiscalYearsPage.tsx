import { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FiscalYearList } from '../../components/fiscal-years/FiscalYearList';
import { NewFiscalYearForm } from '../../components/fiscal-years/NewFiscalYearForm';
import { CloseFiscalYearModal } from '../../components/fiscal-years/CloseFiscalYearModal';
import { ReopenFiscalYearModal } from '../../components/fiscal-years/ReopenFiscalYearModal';
import { AuditFiscalYearModal } from '../../components/fiscal-years/AuditFiscalYearModal';
import { Modal } from '../../components/ui/Modal';
import { useFiscalYear } from '../../hooks/useFiscalYear';
import type { FiscalYear } from '../../types/fiscal-year';
import { useFiscalYearStore } from '../../stores/fiscalYearStore';
import { useFiscalYearAudit } from '../../hooks/useFiscalYearAudit';
import { useAuth0 } from '@auth0/auth0-react';

export function FiscalYearsPage() {
  const [showNewPeriodModal, setShowNewPeriodModal] = useState(false);
  const [selectedFiscalYear, setSelectedFiscalYear] = useState<FiscalYear | null>(null);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showReopenModal, setShowReopenModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  
  const { currentFiscalYear, reopenFiscalYear } = useFiscalYear();
  const { setCurrentFiscalYear } = useFiscalYearStore();
  const { validateAudit } = useFiscalYearAudit();
  const { user } = useAuth0();

  const handleClose = (fiscalYear: FiscalYear) => {
    setSelectedFiscalYear(fiscalYear);
    setShowCloseModal(true);
  };

  const handleReopen = (fiscalYear: FiscalYear) => {
    setSelectedFiscalYear(fiscalYear);
    setShowReopenModal(true);
  };

  const handleAudit = (fiscalYear: FiscalYear) => {
    setSelectedFiscalYear(fiscalYear);
    setShowAuditModal(true);
  };

  const handleReopenConfirm = async () => {
    if (!selectedFiscalYear) return;
    await reopenFiscalYear(selectedFiscalYear.id);
    setShowReopenModal(false);
    setSelectedFiscalYear(null);
  };

  const handleAuditConfirm = async (credentials: any) => {
    if (!selectedFiscalYear) return;
    const validation = await validateAudit(selectedFiscalYear, credentials);
    if (validation.success) {
      // Mettre à jour le statut d'audit
      setCurrentFiscalYear({
        ...selectedFiscalYear,
        auditStatus: {
          isAudited: true,
          auditor: {
            name: credentials.name,
            registrationNumber: credentials.registrationNumber
          },
          auditedAt: new Date().toISOString()
        }
      });
    } else {
      throw new Error(validation.message);
    }
  };

  const roles = user?.[`${import.meta.env.VITE_AUTH0_AUDIENCE}/roles`] as string[] | undefined;
  const isAuditor = roles?.includes('auditor');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Exercices Comptables</h1>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowNewPeriodModal(true)}
        >
          Nouvel Exercice
        </Button>
      </div>

      <Card title="Liste des exercices" icon={Calendar}>
        <FiscalYearList
          fiscalYears={[]}
          onClose={handleClose}
          onReopen={handleReopen}
          onAudit={handleAudit}
          selectedFiscalYear={currentFiscalYear}
          isAuditor={isAuditor}
        />
      </Card>

      <Modal title="Nouvel Exercice Comptable" isOpen={showNewPeriodModal} onClose={() => setShowNewPeriodModal(false)}>
        <NewFiscalYearForm
          onSubmit={async (data) => {
            console.log(data);
            setShowNewPeriodModal(false);
          }}
          onCancel={() => setShowNewPeriodModal(false)}
          onImport={async () => console.log('Importing data...')}
        />
      </Modal>

      {selectedFiscalYear && (
        <>
          {showCloseModal && (
            <CloseFiscalYearModal
              isOpen={true}
              onClose={() => {
                setShowCloseModal(false);
                setSelectedFiscalYear(null);
              }}
              fiscalYear={selectedFiscalYear}
            />
          )}

          {showReopenModal && (
            <ReopenFiscalYearModal
              isOpen={true}
              onClose={() => {
                setShowReopenModal(false);
                setSelectedFiscalYear(null);
              }}
              fiscalYear={selectedFiscalYear}
              onConfirm={handleReopenConfirm}
            />
          )}

          {showAuditModal && (
            <AuditFiscalYearModal
              isOpen={true}
              onClose={() => {
                setShowAuditModal(false);
                setSelectedFiscalYear(null);
              }}
              fiscalYear={selectedFiscalYear}
              onConfirm={handleAuditConfirm}
            />
          )}
        </>
      )}
    </div>
  );
}