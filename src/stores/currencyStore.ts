import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CurrencyCode, CURRENCIES } from '../config/currency';

interface ExchangeRate {
  currencyCode: CurrencyCode;
  rate: number;
}

interface CurrencyState {
  // Devise de base (généralement celle de l'organisation)
  baseCurrency: CurrencyCode;
  // Devise active pour l'affichage
  displayCurrency: CurrencyCode;
  // Taux de change par rapport à la devise de base
  exchangeRates: Record<CurrencyCode, number>;
  // Actions
  setBaseCurrency: (currency: CurrencyCode) => void;
  setDisplayCurrency: (currency: CurrencyCode) => void;
  setExchangeRate: (currencyCode: CurrencyCode, rate: number) => void;
  updateExchangeRates: (rates: ExchangeRate[]) => void;
  // Conversion entre devises
  convert: (amount: number, fromCurrency: CurrencyCode, toCurrency: CurrencyCode) => number;
}

// Initialiser avec des taux de change par défaut (1 pour la devise de base)
const defaultExchangeRates = Object.keys(CURRENCIES).reduce((rates, code) => {
  rates[code as CurrencyCode] = code === 'CDF' ? 1 : 0;
  return rates;
}, {} as Record<CurrencyCode, number>);

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      baseCurrency: 'CDF',
      displayCurrency: 'CDF',
      exchangeRates: defaultExchangeRates,
      
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      
      setDisplayCurrency: (currency) => set({ displayCurrency: currency }),
      
      setExchangeRate: (currencyCode, rate) => set((state) => ({
        exchangeRates: {
          ...state.exchangeRates,
          [currencyCode]: rate
        }
      })),
      
      updateExchangeRates: (rates) => set((state) => {
        const newRates = { ...state.exchangeRates };
        rates.forEach(({ currencyCode, rate }) => {
          newRates[currencyCode] = rate;
        });
        return { exchangeRates: newRates };
      }),
      
      convert: (amount, fromCurrency, toCurrency) => {
        const state = get();
        // Si les devises sont identiques, pas de conversion nécessaire
        if (fromCurrency === toCurrency) return amount;
        
        // Récupérer les taux de change
        const fromRate = state.exchangeRates[fromCurrency];
        const toRate = state.exchangeRates[toCurrency];
        
        // Vérifier que les taux sont valides
        if (fromRate <= 0 || toRate <= 0) {
          console.error('Taux de change invalides');
          return amount;
        }
        
        // Convertir en devise de base, puis dans la devise cible
        if (fromCurrency === state.baseCurrency) {
          // De la devise de base vers une autre devise
          return amount / toRate;
        } else if (toCurrency === state.baseCurrency) {
          // D'une devise vers la devise de base
          return amount * fromRate;
        } else {
          // Entre deux devises qui ne sont pas la devise de base
          // Convertir d'abord en devise de base, puis en devise cible
          return (amount * fromRate) / toRate;
        }
      }
    }),
    {
      name: 'currency-storage',
    }
  )
);
