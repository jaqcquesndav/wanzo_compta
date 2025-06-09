import { useState, useEffect } from 'react';
import { fiscalYearsApi } from '../services/api/endpoints/fiscalYears';
import type { FiscalYear } from '../types/fiscal-year';

export function useFiscalYear() {
  const [currentFiscalYear, setCurrentFiscalYear] = useState<FiscalYear | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiscalYear();
  }, []);

  const loadFiscalYear = async () => {
    try {
      const response = await fiscalYearsApi.getAll();
      if (response.success && response.data) {
        const openYear = response.data.find(year => year.status === 'open');
        setCurrentFiscalYear(openYear || null);
      }
    } catch (error) {
      console.error('Failed to load fiscal year:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPeriod = (fiscalYear: FiscalYear) => {
    const start = new Date(fiscalYear.startDate);
    const end = new Date(fiscalYear.endDate);
    return `${start.toLocaleDateString('fr-FR')} - ${end.toLocaleDateString('fr-FR')}`;
  };

  const reopenFiscalYear = async (id: string): Promise<void> => {
    try {
      const response = await fiscalYearsApi.reopen(id);
      if (response.success && response.data) {
        setCurrentFiscalYear(response.data);
      }
    } catch (error) {
      console.error('Failed to reopen fiscal year:', error);
      throw error;
    }
  };

  return {
    currentFiscalYear,
    loading,
    formatPeriod,
    reopenFiscalYear,
    loadFiscalYear
  };
}