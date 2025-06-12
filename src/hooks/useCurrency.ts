import { CURRENCIES, type CurrencyCode } from '../config/currency';
import { useCurrencyStore } from '../stores/currencyStore';

export function useCurrency() {
  const {
    displayCurrency,
    setDisplayCurrency,
    baseCurrency,
    exchangeRates,
    convert
  } = useCurrencyStore();

  const format = (amount: number, currency?: CurrencyCode): string => {
    const currencyToUse = currency || displayCurrency;
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency: currencyToUse
    }).format(amount);
  };

  const formatCompact = (amount: number, currency?: CurrencyCode): string => {
    const currencyToUse = currency || displayCurrency;
    const millions = amount / 1000000;
    return `${millions.toFixed(1)}M ${CURRENCIES[currencyToUse].symbol}`;
  };
  
  // Fonction pour convertir un montant d'une devise à une autre
  const convertAmount = (amount: number, fromCurrency: CurrencyCode, toCurrency: CurrencyCode): number => {
    return convert(amount, fromCurrency, toCurrency);
  };
  
  // Fonction pour formater un montant après conversion
  const formatConverted = (amount: number, fromCurrency: CurrencyCode = baseCurrency): string => {
    const convertedAmount = convertAmount(amount, fromCurrency, displayCurrency);
    return format(convertedAmount);
  };

  return {
    currentCurrency: displayCurrency,
    setCurrentCurrency: setDisplayCurrency,
    baseCurrency,
    format,
    formatCompact,
    formatConverted,
    convertAmount,
    currencies: CURRENCIES,
    exchangeRates
  };
}