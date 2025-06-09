import { create } from 'zustand';

interface CalculatorStore {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false })
}));