import React from 'react';
import { BarChart2, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { FiscalYearBanner } from '../../components/dashboard/FiscalYearBanner';
import { FinancialMetricsCard } from '../../components/dashboard/FinancialMetricsCard';
import { RevenueChart } from '../../components/charts/RevenueChart';
import { ExpensesPieChart } from '../../components/charts/ExpensesPieChart';
import { mockDashboardData } from '../../data/mockDashboardData';

export function DashboardPage() {
  const {
    quickStats,
    metrics,
    revenueData,
    expensesData,
    recentTransactions,
    alerts
  } = mockDashboardData;

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR', { 
      style: 'currency', 
      currency: 'XOF' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tableau de Bord Comptable
        </h1>
      </div>

      <FiscalYearBanner />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Actif" icon={DollarSign}>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-primary">
              {formatAmount(quickStats.totalAssets)}
            </p>
            <p className="text-sm text-success flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +{quickStats.trends.assets.value}% vs mois dernier
            </p>
          </div>
        </Card>
        
        <Card title="Chiffre d'Affaires" icon={BarChart2}>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-primary">
              {formatAmount(quickStats.revenue)}
            </p>
            <p className="text-sm text-success flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +{quickStats.trends.revenue.value}% vs mois dernier
            </p>
          </div>
        </Card>
        
        <Card title="Résultat Net" icon={TrendingUp}>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-primary">
              {formatAmount(quickStats.netIncome)}
            </p>
            <p className="text-sm text-success flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +{quickStats.trends.netIncome.value}% vs mois dernier
            </p>
          </div>
        </Card>
      </div>

      <FinancialMetricsCard {...metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Évolution du chiffre d'affaires">
          <RevenueChart data={revenueData} />
        </Card>

        <Card title="Répartition des charges">
          <ExpensesPieChart data={expensesData} />
        </Card>
      </div>

      <Card title="Activité Récente">
        <div className="space-y-4">
          {recentTransactions.map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(transaction.date).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <span className={`text-sm font-medium ${
                transaction.type === 'credit' ? 'text-success' : 'text-red-600'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}
                {formatAmount(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Alertes" icon={AlertCircle}>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div 
              key={alert.id}
              className={`flex items-center ${
                alert.type === 'warning' 
                  ? 'text-warning' 
                  : alert.type === 'error'
                  ? 'text-red-600'
                  : 'text-success'
              }`}
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              <p className="text-sm">{alert.message}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}