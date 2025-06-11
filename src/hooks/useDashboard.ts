import { useState, useEffect } from 'react';
import { dashboardApi } from '../services/api/endpoints/dashboard';
import { IndexedDBService } from '../services/storage/IndexedDBService';
import { mockDashboardData } from '../data/mockDashboardData';
import type { DashboardData } from '../types/dashboard';
import { useFiscalYearStore } from '../stores/fiscalYearStore';

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>(mockDashboardData);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentFiscalYear } = useFiscalYearStore();
  
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Essayer de charger les données de IndexedDB d'abord
      const localData = await IndexedDBService.get<DashboardData>('dashboard_data', 'current');
      if (localData) {
        setDashboardData(localData);
      }
      
      // Si en ligne, récupérer les données fraîches de l'API
      if (navigator.onLine) {
        const fiscalYearId = currentFiscalYear?.id;
        const response = await dashboardApi.getDashboardData({ fiscalYearId });
        
        if (response.success && response.data) {
          // Mettre à jour l'état et stocker dans IndexedDB
          setDashboardData(response.data);
          await IndexedDBService.update('dashboard_data', {
            id: 'current',
            ...response.data,
            timestamp: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données du tableau de bord:', error);
    } finally {
      setLoading(false);
    }
  };

  // Charger les données au montage et lorsque l'exercice fiscal change
  useEffect(() => {
    loadDashboardData();
  }, [currentFiscalYear?.id]);
  
  return {
    dashboardData,
    loading,
    refreshDashboard: loadDashboardData
  };
}
