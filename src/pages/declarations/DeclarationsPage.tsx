import React, { useState } from 'react';
import { FileSpreadsheet, Plus } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DeclarationList } from './components/DeclarationList';
import { NewDeclarationModal } from './components/NewDeclarationModal';
import { DeclarationFilters } from './components/DeclarationFilters';
import { DeclarationPreview } from '../../components/declarations/DeclarationPreview';
import { Modal } from '../../components/ui/Modal';
import { useReportActions } from '../../hooks/useReportActions';
import type { Declaration } from '../../types/declarations';

export function DeclarationsPage() {
  const [showNewDeclarationModal, setShowNewDeclarationModal] = useState(false);
  const [selectedDeclaration, setSelectedDeclaration] = useState<Declaration | null>(null);
  const { handleDownload, handlePrint } = useReportActions();

  // Données d'exemple
  const declarations: Declaration[] = [
    {
      id: '1',
      type: 'IPR',
      period: '2024-02',
      periodicity: 'monthly',
      dueDate: '2024-03-15',
      status: 'pending',
      amount: 1800000,
      reference: 'IPR-2024-02'
    },
    {
      id: '2',
      type: 'IB',
      period: '2023',
      periodicity: 'annual',
      dueDate: '2024-03-31',
      status: 'draft',
      amount: 5000000,
      reference: 'IB-2023'
    },
    {
      id: '3',
      type: 'CNSS',
      period: '2024-02',
      periodicity: 'monthly',
      dueDate: '2024-03-10',
      status: 'pending',
      amount: 750000,
      reference: 'CNSS-2024-02'
    }
  ];

  const handlePreview = (declaration: Declaration) => {
    setSelectedDeclaration(declaration);
  };

  const handleDownloadDeclaration = (declaration: Declaration) => {
    handleDownload('pdf', declaration);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Déclarations Fiscales</h1>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowNewDeclarationModal(true)}
        >
          Nouvelle Déclaration
        </Button>
      </div>

      <Card title="Déclarations" icon={FileSpreadsheet}>
        <div className="space-y-4">
          <DeclarationFilters />
          <DeclarationList 
            declarations={declarations}
            onPreview={handlePreview}
            onDownload={handleDownloadDeclaration}
          />
        </div>
      </Card>

      <NewDeclarationModal
        isOpen={showNewDeclarationModal}
        onClose={() => setShowNewDeclarationModal(false)}
      />

      {selectedDeclaration && (
        <Modal
          isOpen={!!selectedDeclaration}
          onClose={() => setSelectedDeclaration(null)}
          title={`Déclaration ${selectedDeclaration.reference}`}
          size="xl"
        >
          <DeclarationPreview
            declaration={selectedDeclaration}
            onDownload={() => handleDownloadDeclaration(selectedDeclaration)}
            onPrint={handlePrint}
          />
        </Modal>
      )}
    </div>
  );
}