import { CURRENCIES, type CurrencyCode } from '../config/currency';

export function formatCurrency(amount: number, currency: CurrencyCode = 'CDF'): string {
  return new Intl.NumberFormat('fr-CD', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatCompactCurrency(amount: number, currency: CurrencyCode = 'CDF'): string {
  const millions = amount / 1000000;
  return `${millions.toFixed(1)}M ${CURRENCIES[currency].symbol}`;
}

export function calculateVariation(current: number, previous: number): number {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
}