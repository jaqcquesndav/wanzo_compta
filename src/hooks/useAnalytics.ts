import { useState, useEffect } from 'react';
import { loadLocalAnalytics, fetchAndUpdateAnalytics } from '../services/analytics/dataService';
import { calculateAnalyticsSummary } from '../utils/analytics/calculations';
import { FALLBACK_DATA, FALLBACK_SUMMARY } from '../data/analytics/fallbackData';
import type { AnalyticData, AnalyticSummary } from '../types/analytics';

export function useAnalytics() {
  const [salesData, setSalesData] = useState<AnalyticData[]>([]);
  const [expensesData, setExpensesData] = useState<AnalyticData[]>([]);
  const [salesSummary, setSalesSummary] = useState<AnalyticSummary | null>(null);
  const [expensesSummary, setExpensesSummary] = useState<AnalyticSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setError(null);
      
      // Load local data
      const localSales = await loadLocalAnalytics('analytics_sales');
      const localExpenses = await loadLocalAnalytics('analytics_expenses');

      // Handle sales data
      if (localSales.length > 0) {
        setSalesData(localSales);
        setSalesSummary(calculateAnalyticsSummary(localSales));
      } else if (import.meta.env.DEV) {
        setSalesData(FALLBACK_DATA);
        setSalesSummary(FALLBACK_SUMMARY);
      }

      // Handle expenses data
      if (localExpenses.length > 0) {
        setExpensesData(localExpenses);
        setExpensesSummary(calculateAnalyticsSummary(localExpenses));
      } else if (import.meta.env.DEV) {
        setExpensesData(FALLBACK_DATA);
        setExpensesSummary(FALLBACK_SUMMARY);
      }

      // Fetch and update if online
      if (navigator.onLine) {
        const [salesResult, expensesResult] = await Promise.all([
          fetchAndUpdateAnalytics('analytics_sales'),
          fetchAndUpdateAnalytics('analytics_expenses')
        ]);

        if (salesResult) {
          setSalesData(salesResult.data);
          setSalesSummary(salesResult.summary);
        }

        if (expensesResult) {
          setExpensesData(expensesResult.data);
          setExpensesSummary(expensesResult.summary);
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load analytics data');
      console.error('Error loading analytics:', error);
      
      if (import.meta.env.DEV) {
        setSalesData(FALLBACK_DATA);
        setExpensesData(FALLBACK_DATA);
        setSalesSummary(FALLBACK_SUMMARY);
        setExpensesSummary(FALLBACK_SUMMARY);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    salesData,
    expensesData,
    salesSummary,
    expensesSummary,
    loading,
    error,
    loadAnalytics
  };
}