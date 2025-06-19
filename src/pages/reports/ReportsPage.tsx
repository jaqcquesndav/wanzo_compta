import { useState } from 'react';
import { Download, Printer, Settings } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ReportConfigModal } from '../../components/reports/ReportConfigModal';
import { DocumentPreview } from '../../components/reports/preview/DocumentPreview';
import { ReportHeader } from '../../components/reports/ReportHeader';
import { useReports } from '../../hooks/useReports';
import { useFinancialExport } from '../../hooks/useFinancialExport';
import { useAuth0 } from '@auth0/auth0-react';
import type { FinancialStatementType } from '../../types/reports';

const STATEMENT_TYPES: Record<FinancialStatementType, string> = {
  'balance': 'Bilan',
  'income': 'Compte de Résultat',
  'cashflow': 'Tableau des Flux de Trésorerie',
  'equity-changes': 'Tableau de Variation des Capitaux Propres',
  'notes': 'Notes Annexes',
  'reconciliation': 'État de Rapprochement',
  'analytical': 'État Analytique',
  'social': 'Bilan Social',
  'statistics': 'État Statistique'
};

export function ReportsPage() {
  const { user } = useAuth0();
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<{
    type: FinancialStatementType;
    format: 'pdf' | 'excel';
    currency: 'USD' | 'CDF';
  }>({
    type: 'balance',
    format: 'pdf',
    currency: 'CDF'
  });

  const { data, loading, error, generateReport } = useReports();
  const { loading: exportLoading, handleExport } = useFinancialExport();

  // Informations de l'entreprise
  const organization = {
    name: 'ENTREPRISE ABC SARL',
    address: 'Kinshasa, RD Congo',
    registrationNumber: 'CD/KIN/RCCM/22-B-01234',
    taxId: 'A1234567Y',
    creditScore: 85,
    esgScore: 'A+',
    financialRating: 'AA'
  };

  const handleConfigSubmit = async (config: any) => {
    setCurrentConfig({
      type: config.type,
      format: config.format,
      currency: config.currency
    });
    
    await generateReport({
      type: config.type,
      format: config.format,
      date: config.period,
      comparative: config.showComparison,
      currency: config.currency,
      includeNotes: config.showAnalytics
    });

    setShowConfigModal(false);
  };

  const handleExportClick = async (format: 'pdf' | 'excel') => {
    if (!data || !user) return;
    
    try {
      await handleExport({
        type: currentConfig.type,
        format,
        data,
        title: STATEMENT_TYPES[currentConfig.type],
        organization,
        generatedBy: user.name || user.email || 'N/A',
        isAudited: true,
        currency: currentConfig.currency
      });
    } catch (error) {
      console.error('Failed to export:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">États Financiers</h1>
        <div className="flex space-x-3">
          <Button 
            variant="secondary" 
            icon={Settings}
            onClick={() => setShowConfigModal(true)}
          >
            Configurer
          </Button>
          <Button 
            variant="secondary" 
            icon={Printer}
            onClick={handlePrint}
            disabled={!data}
          >
            Imprimer
          </Button>
          <Button 
            variant="secondary" 
            icon={Download}
            onClick={() => handleExportClick('pdf')}
            disabled={!data || exportLoading}
          >
            PDF
          </Button>
          <Button 
            variant="secondary" 
            icon={Download}
            onClick={() => handleExportClick('excel')}
            disabled={!data || exportLoading}
          >
            Excel
          </Button>
        </div>
      </div>

      {/* Contenu principal */}
      <Card title="Aperçu du rapport">
        <div className="space-y-6">
          {/* En-tête du rapport */}
          {data && user && (
            <ReportHeader
              title={STATEMENT_TYPES[currentConfig.type]}
              organization={organization}
              generatedBy={user.name || user.email || 'N/A'}
              isAudited={true}
              currency={currentConfig.currency}
            />
          )}

          {/* Prévisualisation */}
          <DocumentPreview 
            format={currentConfig.format}
            data={data}
            type={currentConfig.type}
            loading={loading}
          />

          {/* Message d'erreur */}
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </Card>

      {/* Modal de configuration */}
      <ReportConfigModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onSubmit={handleConfigSubmit}
      />

      {/* Zone d'impression cachée */}
      <div className="hidden print:block">
        {data && user && (
          <ReportHeader
            organization={organization}
            title={STATEMENT_TYPES[currentConfig.type]}
            isAudited={true}
            generatedBy={user.name || user.email || 'N/A'}
            currency={currentConfig.currency}
          />
        )}
        <DocumentPreview 
          format="pdf"
          data={data}
          type={currentConfig.type}
        />
      </div>
    </div>
  );
}