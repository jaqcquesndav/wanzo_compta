import { IndexedDBService } from '../storage/IndexedDBService';
import { analyticsApi } from '../api/endpoints/analytics';
import type { AnalyticData } from '../../types/analytics';

export async function loadLocalAnalytics(store: string): Promise<AnalyticData[]> {
  return await IndexedDBService.getAll<AnalyticData>(store);
}

export async function fetchAndUpdateAnalytics(store: string) {
  const response = await (store === 'analytics_sales' 
    ? analyticsApi.getSalesAnalytics()
    : analyticsApi.getExpensesAnalytics());

  if (response.success && response.data) {
    // Update IndexedDB
    for (const item of response.data.data) {
      await IndexedDBService.update(store, item);
    }
    return response.data;
  }
  return null;
}