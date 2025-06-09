import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AccountingMode = 'SYSCOHADA' | 'IFRS';

interface AccountingState {
  mode: AccountingMode;
  setMode: (mode: AccountingMode) => void;
}

export const useAccountingStore = create<AccountingState>()(
  persist(
    (set) => ({
      mode: 'SYSCOHADA',
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'accounting-storage',
    }
  )
);