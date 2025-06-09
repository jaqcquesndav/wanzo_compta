import { ApiService } from '../ApiService';
import type { AnalyticData, AnalyticSummary } from '../../../types/analytics';
import type { PaginatedResponse } from '../types';

export const analyticsApi = {
  getSalesAnalytics: (params?: {
    startDate?: string;
    endDate?: string;
    category?: string;
    groupBy?: 'day' | 'week' | 'month';
  }) => 
    ApiService.get<{
      data: AnalyticData[];
      summary: AnalyticSummary;
    }>('/analytics/sales'),

  getExpensesAnalytics: (params?: {
    startDate?: string;
    endDate?: string;
    category?: string;
    groupBy?: 'day' | 'week' | 'month';
  }) => 
    ApiService.get<{
      data: AnalyticData[];
      summary: AnalyticSummary;
    }>('/analytics/expenses'),

  getComparativeAnalysis: (params: {
    type: 'sales' | 'expenses';
    currentPeriod: { startDate: string; endDate: string };
    previousPeriod: { startDate: string; endDate: string };
  }) => 
    ApiService.get<{
      current: AnalyticData[];
      previous: AnalyticData[];
      variation: number;
    }>('/analytics/compare'),

  getTrends: (params: {
    type: 'sales' | 'expenses';
    period: 'month' | 'quarter' | 'year';
  }) => 
    ApiService.get<{
      data: Array<{
        period: string;
        value: number;
        trend: number;
      }>;
    }>('/analytics/trends')
};