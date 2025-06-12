export interface DashboardData {
  quickStats: {
    totalAssets: number;
    revenue: number; // Chiffre d'affaires
    netIncome: number; // Résultat Net
    cashOnHand: number; // Trésorerie Nette Actuelle
    trends: {
      assets: { value: number; isPositive: boolean };
      revenue: { value: number; isPositive: boolean };
      netIncome: { value: number; isPositive: boolean };
      cashOnHand: { value: number; isPositive: boolean };
    };
  };
  financialRatios: { // Remplacement de 'metrics'
    grossProfitMargin: number; // Marge Brute en %
    breakEvenPoint: number; // Seuil de Rentabilité en devise
    daysSalesOutstanding: number; // DSO en jours
    daysPayableOutstanding: number; // DPO en jours
    workingCapital: number; // Besoin en Fonds de Roulement (BFR) en devise
    currentRatio: number; // Ratio de Liquidité Générale
  };
  keyPerformanceIndicators: { // Nouvelle section pour la cote de crédit et note financière
    creditScore: number;
    financialRating: string;
  };
  revenueData: Array<{
    date: string;
    revenue: number;
  }>;
  expensesData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  recentTransactions: Array<{
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
  }>;
  alerts: Array<{
    id: string;
    type: 'warning' | 'error' | 'success';
    message: string;
  }>;
}