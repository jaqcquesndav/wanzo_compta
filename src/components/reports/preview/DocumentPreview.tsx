import { FileText, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { FinancialStatementPreview } from './FinancialStatementPreview';
import type { FinancialStatementType } from '../../../types/reports';

interface DocumentPreviewProps {
  format: 'pdf' | 'excel';
  data: any;
  type?: FinancialStatementType;
  loading?: boolean;
  error?: string | null;
}

export function DocumentPreview({ format, data, type, loading, error }: DocumentPreviewProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-50 rounded-lg">
        <div className="text-center text-red-600">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Sélectionnez un type d'état et cliquez sur Générer</p>
      </div>
    );
  }

  // Validation des données selon le type
  const validateData = () => {
    try {
      switch (type) {
        case 'balance':
          if (!data.fixedAssets || !data.currentAssets || !data.equity) {
            throw new Error('Données du bilan incomplètes');
          }
          break;
        case 'income':
          if (!data.operatingIncome || !data.operatingExpenses || !data.netResult) {
            throw new Error('Données du compte de résultat incomplètes');
          }
          break;
        case 'cashflow':
          if (!data.operatingActivities || !data.netCashChange) {
            throw new Error('Données du tableau de flux incomplètes');
          }
          break;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  if (!validateData()) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-50 rounded-lg">
        <div className="text-center text-red-600">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          <p>Les données sont incomplètes ou invalides</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b flex items-center">
        {format === 'pdf' ? (
          <FileText className="h-5 w-5 text-gray-500 mr-2" />
        ) : (
          <FileSpreadsheet className="h-5 w-5 text-gray-500 mr-2" />
        )}
        <span className="text-sm font-medium text-gray-700">
          Prévisualisation - Format {format.toUpperCase()}
        </span>
      </div>
      <div className="bg-white p-6 overflow-x-auto">
        {type && <FinancialStatementPreview type={type} data={data} />}
      </div>
    </div>
  );
}