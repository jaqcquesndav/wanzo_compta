import { useState } from 'react';
import { reportsApi } from '../services/api/endpoints/reports';
import { 
  mockBalanceSheet, 
  mockIncomeStatement, 
  mockCashFlow, 
  mockEquityChanges,
  mockNotes 
} from '../data/mockFinancialData';
import type { 
  BalanceSheetData, 
  IncomeStatementData, 
  CashFlowStatementData,
  EquityChangesData,
  NotesData,
  FinancialStatementType 
} from '../types/reports';

export function useReports() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = async (params: {
    type: FinancialStatementType;
    format: 'pdf' | 'excel';
    date?: string;
    startDate?: string;
    endDate?: string;
    comparative?: boolean;
    currency?: string;
    includeNotes?: boolean;
  }) => {
    setLoading(true);
    setError(null);

    try {
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Utiliser les données de démonstration selon le type
      let mockData;
      switch (params.type) {
        case 'balance':
          mockData = mockBalanceSheet;
          break;
        case 'income':
          mockData = mockIncomeStatement;
          break;
        case 'cashflow':
          mockData = mockCashFlow;
          break;
        case 'equity-changes':
          mockData = mockEquityChanges;
          break;
        case 'notes':
          mockData = mockNotes;
          break;
        default:
          mockData = null;
      }

      setData(mockData);

    } catch (err) {
      console.error('Error generating report:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    generateReport
  };
}