import React from 'react';
import { BarChart2, TrendingUp, DollarSign, RefreshCw, Briefcase as BriefcaseIcon } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { FiscalYearBanner } from '../../components/dashboard/FiscalYearBanner';
import { FinancialMetricsCard } from '../../components/dashboard/FinancialMetricsCard';
import { KeyPerformanceIndicatorsCard } from '../../components/dashboard/KeyPerformanceIndicatorsCard';
import { RevenueChart } from '../../components/charts/RevenueChart';
import { ExpensesPieChart } from '../../components/charts/ExpensesPieChart';
import { useCurrency } from '../../hooks/useCurrency';
import { useDashboard } from '../../hooks/useDashboard';
import { Button } from '../../components/ui/Button';
import { useNotifications } from '../../hooks/useNotifications';

export function DashboardPage() {
  const { dashboardData, loading, refreshDashboard } = useDashboard();
  const { format } = useCurrency();
  const { addNotification } = useNotifications();

  const {
    quickStats,
    financialRatios,
    keyPerformanceIndicators,
    revenueData,
    expensesData,
    recentTransactions,
    alerts
  } = dashboardData;
  
  // Fonction pour rafraîchir les données du dashboard
  const handleRefresh = () => {
    refreshDashboard();
    addNotification({
      title: 'Tableau de bord',
      message: 'Les données ont été rafraîchies avec succès',
      type: 'success'
    });
  };
  
  // Convertir les alertes en notifications au chargement de la page
  React.useEffect(() => {
    if (alerts && alerts.length > 0) {
      alerts.forEach(alert => {
        addNotification({
          title: 'Alerte',
          message: alert.message,
          type: alert.type === 'success' ? 'success' : 
                alert.type === 'warning' ? 'warning' : 'error'
        });
      });
    }
  }, [alerts, addNotification]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tableau de Bord Comptable
        </h1>
        <Button 
          variant="outline"
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      <FiscalYearBanner />
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Total Actif" icon={DollarSign}>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary">
                  {format(quickStats.totalAssets)}
                </p>
                <p className="text-sm text-success flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{quickStats.trends.assets.value}% vs mois dernier
                </p>
              </div>
            </Card>
            
            <Card title="Chiffre d'Affaires (Mois)" icon={BarChart2}>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary">
                  {format(quickStats.revenue)}
                </p>
                <p className="text-sm text-success flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{quickStats.trends.revenue.value}% vs mois dernier
                </p>
              </div>
            </Card>
            
            <Card title="Résultat Net (Mois)" icon={TrendingUp}>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary">
                  {format(quickStats.netIncome)}
                </p>
                <p className="text-sm text-success flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{quickStats.trends.netIncome.value}% vs mois dernier
                </p>
              </div>
            </Card>

            {/* KPI: Trésorerie Nette Actuelle */}
            <Card title="Trésorerie Nette" icon={BriefcaseIcon}>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary">
                  {format(quickStats.cashOnHand)}
                </p>
                <p className={`text-sm flex items-center ${quickStats.trends.cashOnHand.isPositive ? 'text-success' : 'text-red-600'}`}>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {quickStats.trends.cashOnHand.isPositive ? '+' : '-'}{quickStats.trends.cashOnHand.value}% vs mois dernier
                </p>
              </div>
            </Card>
          </div>

          {financialRatios && <FinancialMetricsCard {...financialRatios} />}

          {/* Added KeyPerformanceIndicatorsCard */}
          {keyPerformanceIndicators && (
            <KeyPerformanceIndicatorsCard
              creditScore={keyPerformanceIndicators.creditScore}
              financialRating={keyPerformanceIndicators.financialRating}
            />
          )}

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
                    {format(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}