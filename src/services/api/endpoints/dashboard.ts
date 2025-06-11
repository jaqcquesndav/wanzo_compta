import { ApiService } from '../ApiService';
import type { DashboardData } from '../../../types/dashboard';

export const dashboardApi = {
  // Récupérer les données du tableau de bord
  getDashboardData: (params?: { 
    period?: 'day' | 'week' | 'month' | 'quarter' | 'year';
    fiscalYearId?: string;
  }) => 
    ApiService.get<DashboardData>('/dashboard', { params }),

  // Récupérer les statistiques rapides (KPI)
  getQuickStats: (fiscalYearId?: string) => 
    ApiService.get<DashboardData['quickStats']>('/dashboard/quick-stats', { fiscalYearId }),

  // Récupérer les données de revenus pour le graphique
  getRevenueData: (params?: { 
    startDate?: string;
    endDate?: string;
    period?: 'day' | 'week' | 'month';
    fiscalYearId?: string;
  }) => 
    ApiService.get<DashboardData['revenueData']>('/dashboard/revenue', { params }),

  // Récupérer les données de dépenses pour le graphique
  getExpensesData: (params?: {
    startDate?: string;
    endDate?: string;
    fiscalYearId?: string;
  }) => 
    ApiService.get<DashboardData['expensesData']>('/dashboard/expenses', { params }),
    
  // Récupérer les transactions récentes
  getRecentTransactions: (limit?: number) => 
    ApiService.get<DashboardData['recentTransactions']>('/dashboard/transactions', { limit }),
    
  // Récupérer les alertes
  getAlerts: () => 
    ApiService.get<DashboardData['alerts']>('/dashboard/alerts')
};
