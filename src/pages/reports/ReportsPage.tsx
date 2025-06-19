import { useState } from 'react';
import { Download, Printer, Settings } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ReportConfigModal } from '../../components/reports/ReportConfigModal';
import { DocumentPreview } from '../../components/reports/preview/DocumentPreview';
import { ReportHeader } from '../../components/reports/ReportHeader';
import { PrintableReport } from '../../components/reports/PrintableReport';
import { useReports } from '../../hooks/useReports';
import { useFinancialExport } from '../../hooks/useFinancialExport';
import { useOrganization } from '../../hooks/useOrganization';
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
  const { organization: orgData } = useOrganization();
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
  // Informations de l'entreprise avec fallback
  const organization = orgData ? {
    name: orgData.name,
    address: [orgData.address, orgData.city, orgData.country].filter(Boolean).join(', '),    registrationNumber: orgData.registrationNumber,
    taxId: orgData.taxId,
    creditScore: 85,
    esgScore: 'A+',
    financialRating: 'AA',
    logo: orgData.logo,
    industry: orgData.industry,
    legalForm: orgData.legalForm,
    phone: orgData.phone,
    email: orgData.email,
    website: orgData.website
  } : {
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
  };  const handlePrint = () => {
    // Référence à l'iframe qui sera utilisée pour l'impression
    const printFrame = document.getElementById('report-print-frame') as HTMLIFrameElement;
    if (!printFrame || !printFrame.contentWindow) return;

    // Accéder au document de l'iframe
    const printDocument = printFrame.contentWindow.document;
    
    // Ouvrir le document pour écriture
    printDocument.open();
    
    // Écrire le contenu HTML d'impression dans l'iframe
    printDocument.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${STATEMENT_TYPES[currentConfig.type]} - Impression</title>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #000;
              background: #fff;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            th {
              background-color: #f8f9fa;
              font-weight: bold;
              text-align: left;
            }
            .text-right {
              text-align: right;
            }
            .bg-gray-700 {
              background-color: #374151;
              color: white;
            }
            .bg-gray-50 {
              background-color: #f9fafb;
            }
            .bg-gray-100 {
              background-color: #f3f4f6;
            }
            .font-bold {
              font-weight: bold;
            }
            .font-medium {
              font-weight: 500;
            }
            h1, h2, h3 {
              color: #111827;
            }
            .text-center {
              text-align: center;
            }
            .mb-8 {
              margin-bottom: 32px;
            }
            .mb-4 {
              margin-bottom: 16px;
            }
            .mb-2 {
              margin-bottom: 8px;
            }
            .mb-1 {
              margin-bottom: 4px;
            }
            .mt-8 {
              margin-top: 32px;
            }
            .mt-4 {
              margin-top: 16px;
            }
            .border-t {
              border-top: 1px solid #e5e7eb;
            }
            .pt-4 {
              padding-top: 16px;
            }
            .text-gray-600 {
              color: #4b5563;
            }
            .text-sm {
              font-size: 0.875rem;
            }
            @media print {
              body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          <div id="print-content"></div>
        </body>
      </html>
    `);
    
    // Fermer le document
    printDocument.close();
    
    // Rendre notre composant React dans l'élément print-content de l'iframe
    if (data && user) {
      const printContainer = printDocument.getElementById('print-content');
      if (printContainer && printFrame.contentWindow) {
        // Injecter le contenu HTML du rapport
        printContainer.innerHTML = document.getElementById('printable-report-content')?.innerHTML || '';
        
        // Attendre que le contenu soit complètement chargé
        setTimeout(() => {
          printFrame.contentWindow?.print();
        }, 500);
      }
    }
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
      </Card>      {/* Modal de configuration */}
      <ReportConfigModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onSubmit={handleConfigSubmit}
      />

      {/* Zone d'impression cachée */}
      <div className="hidden">
        <div id="printable-report-content">
          {data && user && (
            <PrintableReport
              data={data}
              type={currentConfig.type}
              title={STATEMENT_TYPES[currentConfig.type]}
              organization={organization}
              generatedBy={user.name || user.email || 'N/A'}
              currency={currentConfig.currency}
              date={new Date().getFullYear().toString()}
            />
          )}
        </div>
        <iframe id="report-print-frame" style={{ display: 'none' }}></iframe>
      </div>
    </div>
  );
}