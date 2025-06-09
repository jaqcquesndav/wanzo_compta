import type { CalculatorOperation } from '../../types/calculator';

const STORAGE_KEY = 'calculator_history';

export const calculatorStorage = {
  saveHistory: (operations: CalculatorOperation[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(operations));
    } catch (error) {
      console.error('Error saving calculator history:', error);
    }
  },

  loadHistory: (): CalculatorOperation[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading calculator history:', error);
      return [];
    }
  },

  clearHistory: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing calculator history:', error);
    }
  }
};