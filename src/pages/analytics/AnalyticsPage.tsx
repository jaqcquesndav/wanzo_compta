import React, { useState, useEffect } from 'react';
import { KpiCard } from '../../components/analytics/KpiCard';
import { ChartCard } from '../../components/analytics/ChartCard';
import { AnalyticFilters } from '../../components/analytics/AnalyticFilters';
import { AnalyticTable } from '../../components/analytics/tables/AnalyticTable';
import { useAnalytics } from '../../hooks/useAnalytics';
import { 
  TrendingUp, 
  PieChart, 
  BarChart2, 
  DollarSign 
} from 'lucide-react';
import { AnalyticBarChart } from '../../components/analytics/charts/AnalyticBarChart';
import { AnalyticPieChart } from '../../components/analytics/charts/AnalyticPieChart';

export function AnalyticsPage() {
  const { 
    salesData, 
    expensesData, 
    salesSummary,
    expensesSummary,
    loading 
  } = useAnalytics();

  const [filters, setFilters] = useState({
    period: 'month',
    groupBy: 'day'
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytique</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Chiffre d'affaires"
          value={salesSummary?.total || 0}
          icon={DollarSign}
          trend={salesSummary?.trend ? {
            value: salesSummary.trend,
            isPositive: salesSummary.trend > 0
          } : undefined}
        />
        <KpiCard
          title="Marge brute"
          value={((salesSummary?.total || 0) - (expensesSummary?.total || 0))}
          icon={TrendingUp}
          trend={{
            value: 5,
            isPositive: true
          }}
        />
        <KpiCard
          title="Charges"
          value={expensesSummary?.total || 0}
          icon={BarChart2}
          trend={expensesSummary?.trend ? {
            value: expensesSummary.trend,
            isPositive: expensesSummary.trend > 0
          } : undefined}
        />
        <KpiCard
          title="Résultat net"
          value={(salesSummary?.total || 0) - (expensesSummary?.total || 0)}
          icon={PieChart}
          trend={{
            value: 15,
            isPositive: true
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Évolution du chiffre d'affaires"
          icon={TrendingUp}
          filters={
            <AnalyticFilters 
              onFilterChange={setFilters}
            />
          }
        >
          <AnalyticBarChart
            data={salesData.map(item => ({
              name: new Date(item.date).toLocaleDateString('fr-FR', { month: 'short' }),
              value: item.amount
            }))}
          />
        </ChartCard>

        <ChartCard
          title="Répartition des charges"
          icon={PieChart}
        >
          <AnalyticPieChart
            data={expensesData.reduce((acc, item) => {
              const existing = acc.find(a => a.name === item.category);
              if (existing) {
                existing.value += item.amount;
              } else {
                acc.push({
                  name: item.category,
                  value: item.amount,
                  color: `#${Math.floor(Math.random()*16777215).toString(16)}`
                });
              }
              return acc;
            }, [] as Array<{ name: string; value: number; color: string }>)}
          />
        </ChartCard>
      </div>

      <div className="space-y-8">
        <AnalyticTable
          data={salesData}
          title="Détail des ventes"
          type="sales"
        />

        <AnalyticTable
          data={expensesData}
          title="Détail des charges"
          type="expenses"
        />
      </div>
    </div>
  );
}