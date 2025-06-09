import { useState, useCallback } from 'react';
import type { AnalyticData, AnalyticFilter } from '../types/analytics';

export function useAnalyticFilters() {
  const [filters, setFilters] = useState<AnalyticFilter>({
    period: 'month',
    category: '',
    minAmount: undefined,
    maxAmount: undefined
  });

  const applyFilters = useCallback((data: AnalyticData[]): AnalyticData[] => {
    return data.filter(item => {
      // Filter by category
      if (filters.category && item.category !== filters.category) {
        return false;
      }

      // Filter by amount range
      if (filters.minAmount !== undefined && item.amount < filters.minAmount) {
        return false;
      }
      if (filters.maxAmount !== undefined && item.amount > filters.maxAmount) {
        return false;
      }

      // Filter by period
      const itemDate = new Date(item.date);
      const now = new Date();

      switch (filters.period) {
        case 'today':
          return itemDate.toDateString() === now.toDateString();
        case 'week':
          const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
          return itemDate >= weekStart;
        case 'month':
          return itemDate.getMonth() === now.getMonth() && 
                 itemDate.getFullYear() === now.getFullYear();
        case 'quarter':
          const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
          return itemDate >= quarterStart;
        case 'year':
          return itemDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  }, [filters]);

  return {
    filters,
    setFilters,
    applyFilters
  };
}