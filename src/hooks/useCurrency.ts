import { useState } from 'react';
import { CURRENCIES, type CurrencyCode } from '../config/currency';

export function useCurrency() {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>(
    Object.values(CURRENCIES).find(c => c.default)?.code || 'CDF'
  );

  const format = (amount: number): string => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency: currentCurrency
    }).format(amount);
  };

  const formatCompact = (amount: number): string => {
    const millions = amount / 1000000;
    return `${millions.toFixed(1)}M ${CURRENCIES[currentCurrency].symbol}`;
  };

  return {
    currentCurrency,
    setCurrentCurrency,
    format,
    formatCompact,
    currencies: CURRENCIES
  };
}