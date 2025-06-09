import { useMemo } from 'react';
import type { AnalyticData } from '../types/analytics';

interface TrendResult {
  currentValue: number;
  previousValue: number;
  variation: number;
  trend: 'up' | 'down' | 'stable';
}

export function useAnalyticTrends() {
  const calculateTrend = (data: AnalyticData[], period: 'month' | 'quarter' | 'year'): TrendResult => {
    const now = new Date();
    let currentStart: Date;
    let previousStart: Date;

    switch (period) {
      case 'month':
        currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
        previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case 'quarter':
        const currentQuarter = Math.floor(now.getMonth() / 3);
        currentStart = new Date(now.getFullYear(), currentQuarter * 3, 1);
        previousStart = new Date(now.getFullYear(), (currentQuarter - 1) * 3, 1);
        break;
      case 'year':
        currentStart = new Date(now.getFullYear(), 0, 1);
        previousStart = new Date(now.getFullYear() - 1, 0, 1);
        break;
    }

    const currentData = data.filter(item => new Date(item.date) >= currentStart);
    const previousData = data.filter(item => 
      new Date(item.date) >= previousStart && new Date(item.date) < currentStart
    );

    const currentValue = currentData.reduce((sum, item) => sum + item.amount, 0);
    const previousValue = previousData.reduce((sum, item) => sum + item.amount, 0);
    const variation = previousValue ? ((currentValue - previousValue) / previousValue) * 100 : 0;

    return {
      currentValue,
      previousValue,
      variation,
      trend: variation > 1 ? 'up' : variation < -1 ? 'down' : 'stable'
    };
  };

  const getComparisonData = (data: AnalyticData[], period: 'month' | 'quarter' | 'year') => {
    // Grouper les données par période
    const groupedData = data.reduce((acc, item) => {
      const date = new Date(item.date);
      let key: string;

      switch (period) {
        case 'month':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        case 'quarter':
          const quarter = Math.floor(date.getMonth() / 3) + 1;
          key = `${date.getFullYear()}-Q${quarter}`;
          break;
        case 'year':
          key = date.getFullYear().toString();
          break;
      }

      if (!acc[key]) {
        acc[key] = { current: 0, previous: 0 };
      }
      acc[key].current += item.amount;
      return acc;
    }, {} as Record<string, { current: number; previous: number }>);

    // Convertir en format pour le graphique
    return Object.entries(groupedData).map(([name, values]) => ({
      name,
      ...values
    }));
  };

  return {
    calculateTrend,
    getComparisonData
  };
}