import type { DashboardData } from '../types/dashboard';

export const mockDashboardData: DashboardData = {
  quickStats: {
    totalAssets: 25000000,
    revenue: 15000000,
    netIncome: 5000000,
    cashOnHand: 7500000, // Ajout de la trésorerie nette
    trends: {
      assets: { value: 15, isPositive: true },
      revenue: { value: 8, isPositive: true },
      netIncome: { value: 12, isPositive: true },
      cashOnHand: { value: 5, isPositive: true } // Tendance pour la trésorerie
    }
  },
  financialRatios: { // Remplacement de 'metrics' par 'financialRatios'
    grossProfitMargin: 65, // Marge Brute en %
    breakEvenPoint: 7000000, // Seuil de Rentabilité en devise
    daysSalesOutstanding: 45, // DSO en jours
    daysPayableOutstanding: 30, // DPO en jours
    workingCapital: 3000000, // BFR en devise
    currentRatio: 1.8 // Ratio de Liquidité Générale
  },
  keyPerformanceIndicators: { // Ajout de la nouvelle section
    creditScore: 750, // Exemple de cote de crédit (e.g., sur 850 ou 1000)
    financialRating: 'AA-', // Exemple de note financière
  },
  revenueData: [
    { date: '2024-01', revenue: 12000000 },
    { date: '2024-02', revenue: 15000000 },
    { date: '2024-03', revenue: 18000000 },
    { date: '2024-04', revenue: 16000000 },
    { date: '2024-05', revenue: 20000000 },
    { date: '2024-06', revenue: 25000000 }
  ],
  expensesData: [
    { name: 'Achats', value: 8000000, color: '#197ca8' },
    { name: 'Personnel', value: 5000000, color: '#015730' },
    { name: 'Services', value: 3000000, color: '#ee872b' },
    { name: 'Autres', value: 2000000, color: '#64748b' }
  ],
  recentTransactions: [
    {
      id: '1',
      date: '2024-03-01',
      description: 'Facture client ABC SARL',
      amount: 1180000,
      type: 'credit'
    },
    {
      id: '2',
      date: '2024-03-02',
      description: 'Paiement fournisseur XYZ SA',
      amount: 590000,
      type: 'debit'
    },
    {
      id: '3',
      date: '2024-03-03',
      description: 'Règlement client ABC SARL',
      amount: 1180000,
      type: 'credit'
    }
  ],
  alerts: [
    {
      id: '1',
      type: 'warning',
      message: 'TVA à déclarer avant le 15/03/2024'
    },
    {
      id: '2',
      type: 'error',
      message: '3 factures clients en retard de paiement'
    },
    {
      id: '3',
      type: 'success',
      message: 'États financiers du mois précédent validés'
    }
  ]
};