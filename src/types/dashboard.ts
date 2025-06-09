export interface DashboardData {
  quickStats: {
    totalAssets: number;
    revenue: number;
    netIncome: number;
    trends: {
      assets: { value: number; isPositive: boolean };
      revenue: { value: number; isPositive: boolean };
      netIncome: { value: number; isPositive: boolean };
    };
  };
  metrics: {
    creditScore: number;
    financialRating: string;
    carbonFootprint: number;
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