export const CURRENCIES = {
  CDF: {
    code: 'CDF',
    name: 'Franc Congolais',
    symbol: 'FC',
    default: true
  },
  USD: {
    code: 'USD',
    name: 'Dollar américain',
    symbol: '$',
    default: false
  }
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

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