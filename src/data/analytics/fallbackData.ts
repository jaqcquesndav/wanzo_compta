import type { AnalyticData, AnalyticSummary } from '../../types/analytics';

export const FALLBACK_DATA: AnalyticData[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    category: 'Ventes',
    amount: 1500000,
    description: 'Ventes du mois'
  }
];

export const FALLBACK_SUMMARY: AnalyticSummary = {
  total: 1500000,
  average: 1500000,
  count: 1,
  trend: 0
};