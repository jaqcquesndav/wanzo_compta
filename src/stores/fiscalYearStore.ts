import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FiscalYear } from '../hooks/useFiscalYear';

interface FiscalYearState {
  currentFiscalYear: FiscalYear | null;
  setCurrentFiscalYear: (fiscalYear: FiscalYear | null) => void;
}

export const useFiscalYearStore = create<FiscalYearState>()(
  persist(
    (set) => ({
      currentFiscalYear: null,
      setCurrentFiscalYear: (fiscalYear) => set({ currentFiscalYear: fiscalYear }),
    }),
    {
      name: 'fiscal-year-storage',
    }
  )
);