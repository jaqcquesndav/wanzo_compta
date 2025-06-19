import { useState } from 'react';
// import { reportsApi } from '../services/api/endpoints/reports';
import { 
  mockBalanceSheet, 
  mockIncomeStatement, 
  mockCashFlow, 
  mockEquityChanges,
  mockNotes 
} from '../data/mockFinancialData';
import type { 
  FinancialStatementType 
} from '../types/reports';
import { useCurrency } from './useCurrency';
import { CurrencyCode } from '../config/currency';

// Helper to convert all numerical values in an object
const convertObjectValues = (obj: any, convert: (amount: number) => number): any => {
    if (!obj) return obj;
    if (typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => convertObjectValues(item, convert));
    }

    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value === 'number' && key !== 'code' && key !== 'variation') { // Don't convert codes/percentages
                newObj[key] = convert(value);
            } else if (typeof value === 'object') {
                newObj[key] = convertObjectValues(value, convert);
            } else {
                newObj[key] = value;
            }
        }
    }
    return newObj;
};

export function useReports() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { convertAmount, baseCurrency } = useCurrency();

  const generateReport = async (params: {
    type: FinancialStatementType;
    format: 'pdf' | 'excel';
    date?: string;
    startDate?: string;
    endDate?: string;
    comparative?: boolean;
    currency?: CurrencyCode;
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

      // Convertir les montants si une devise est spécifiée et différente de la devise de base
      if (params.currency && params.currency !== baseCurrency && mockData) {
        const convertedData = convertObjectValues(mockData, (amount) => 
            convertAmount(amount, baseCurrency, params.currency!)
        );
        setData(convertedData);
      } else {
        setData(mockData);
      }

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