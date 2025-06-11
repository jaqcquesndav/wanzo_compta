import { ApiService } from '../ApiService';
import type { 
  BalanceSheetData, 
  IncomeStatementData, 
  CashFlowStatementData,
  EquityChangesData,
  NotesData,
  FinancialStatementType
} from '../../../types/reports';
import { CurrencyCode } from '../../../config/currency';

export const reportsApi = {
  getBalanceSheet: (params: { 
    date: string;
    comparative?: boolean;
    currency?: CurrencyCode;
  }) => 
    ApiService.get<BalanceSheetData>('/reports/balance-sheet', params),

  getIncomeStatement: (params: { 
    startDate: string;
    endDate: string;
    comparative?: boolean;
    currency?: CurrencyCode;
  }) => 
    ApiService.get<IncomeStatementData>('/reports/income-statement', params),

  getCashFlowStatement: (params: {
    startDate: string;
    endDate: string;
    comparative?: boolean;
    currency?: CurrencyCode;
  }) => 
    ApiService.get<CashFlowStatementData>('/reports/cash-flow', params),

  getEquityChanges: (params: {
    startDate: string;
    endDate: string;
    currency?: CurrencyCode;
  }) =>
    ApiService.get<EquityChangesData>('/reports/equity-changes', params),

  getNotes: (params: {
    date: string;
    type: 'balance' | 'income' | 'all';
  }) =>
    ApiService.get<NotesData>('/reports/notes', params),

  generateReport: (params: {
    type: FinancialStatementType;
    format: 'pdf' | 'excel';
    date?: string;
    startDate?: string;
    endDate?: string;
    comparative?: boolean;
    currency?: CurrencyCode;
    includeNotes?: boolean;
  }) =>
    ApiService.post<Blob>('/reports/generate', params),

  exportReport: (params: {
    type: FinancialStatementType;
    format: 'pdf' | 'excel';
    data: any;
  }) =>
    ApiService.post<Blob>('/reports/export', params)
};