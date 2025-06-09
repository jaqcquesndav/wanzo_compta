import type { ChartData } from '../types/charts';

export const mockChartData: ChartData = {
  revenue: [
    { date: '2024-01', revenue: 12500000 },
    { date: '2024-02', revenue: 15800000 },
    { date: '2024-03', revenue: 18200000 },
    { date: '2024-04', revenue: 16500000 },
    { date: '2024-05', revenue: 20100000 },
    { date: '2024-06', revenue: 25300000 }
  ],
  expenses: [
    { name: 'Achats', value: 8500000, color: '#197ca8' },
    { name: 'Personnel', value: 5200000, color: '#015730' },
    { name: 'Services', value: 3100000, color: '#ee872b' },
    { name: 'Autres', value: 2300000, color: '#64748b' }
  ],
  cashFlow: [
    { date: '2024-01', inflow: 11800000, outflow: 7500000 },
    { date: '2024-02', inflow: 14200000, outflow: 8900000 },
    { date: '2024-03', inflow: 16800000, outflow: 10200000 },
    { date: '2024-04', inflow: 15300000, outflow: 9800000 },
    { date: '2024-05', inflow: 18900000, outflow: 11500000 },
    { date: '2024-06', inflow: 23500000, outflow: 14200000 }
  ],
  analytics: {
    monthly: [
      { name: 'Jan', value: 12500000 },
      { name: 'Fév', value: 15800000 },
      { name: 'Mar', value: 18200000 },
      { name: 'Avr', value: 16500000 },
      { name: 'Mai', value: 20100000 },
      { name: 'Juin', value: 25300000 }
    ],
    quarterly: [
      { name: 'T1', value: 46500000 },
      { name: 'T2', value: 61900000 }
    ],
    yearly: [
      { name: '2023', value: 185000000 },
      { name: '2024', value: 108400000 }
    ]
  }
};