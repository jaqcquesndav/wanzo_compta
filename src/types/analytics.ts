export interface AnalyticData {
  id: string;
  date: string;
  category: string;
  subcategory?: string;
  amount: number;
  reference?: string;
  description?: string;
}

export interface AnalyticFilter {
  period: string;
  category?: string;
  subcategory?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface AnalyticSummary {
  total: number;
  average: number;
  count: number;
  trend: number;
}