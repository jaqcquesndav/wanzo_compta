export interface ChartData {
  revenue: Array<{
    date: string;
    revenue: number;
  }>;
  expenses: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  cashFlow: Array<{
    date: string;
    inflow: number;
    outflow: number;
  }>;
  analytics: {
    monthly: Array<{
      name: string;
      value: number;
    }>;
    quarterly: Array<{
      name: string;
      value: number;
    }>;
    yearly: Array<{
      name: string;
      value: number;
    }>;
  };
}