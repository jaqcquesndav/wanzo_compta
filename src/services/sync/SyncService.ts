import { IndexedDBService } from '../storage/IndexedDBService';
import { ApiService } from '../api/ApiService';

interface SyncItem {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: string;
  data: any;
  timestamp: string;
  retries: number;
  status: 'pending' | 'processing' | 'failed';
  error?: string;
}

export class SyncService {
  private static SYNC_INTERVAL = 30000; // 30 secondes
  private static MAX_RETRIES = 3;
  private static SYNC_QUEUE_STORE = 'sync_queue';
  private static STATUS_STORE = 'sync_status';
  private static syncInterval: NodeJS.Timeout | null = null;

  static async initialize(): Promise<void> {
    try {
      await IndexedDBService.initDB();
      
      // Démarrer la synchronisation périodique
      if (navigator.onLine) {
        this.startSync();
      }

      // Configurer les écouteurs d'événements
      window.addEventListener('online', () => this.startSync());
      window.addEventListener('offline', () => this.stopSync());
    } catch (error) {
      console.error('Failed to initialize SyncService:', error);
    }
  }

  static async addToSyncQueue(item: Omit<SyncItem, 'timestamp' | 'retries' | 'status'>): Promise<void> {
    const syncItem: SyncItem = {
      ...item,
      timestamp: new Date().toISOString(),
      retries: 0,
      status: 'pending'
    };

    await IndexedDBService.add(this.SYNC_QUEUE_STORE, syncItem);
    
    if (navigator.onLine) {
      await this.processSyncQueue();
    }
  }

  private static async processSyncQueue(): Promise<void> {
    if (!navigator.onLine) return;

    const pendingItems = await IndexedDBService.getByIndex<SyncItem>(
      this.SYNC_QUEUE_STORE,
      'status',
      'pending'
    );

    for (const item of pendingItems) {
      try {
        // Marquer comme en cours de traitement
        await IndexedDBService.update(this.SYNC_QUEUE_STORE, {
          ...item,
          status: 'processing'
        });

        await this.processSyncItem(item);

        // Supprimer l'item après synchronisation réussie
        await IndexedDBService.delete(this.SYNC_QUEUE_STORE, item.id);
      } catch (error) {
        await this.handleSyncError(item, error);
      }
    }
  }

  private static async processSyncItem(item: SyncItem): Promise<void> {
    const endpoint = `/${item.entity.toLowerCase()}`;
    let response;

    switch (item.type) {
      case 'CREATE':
        response = await ApiService.post(endpoint, item.data);
        break;
      case 'UPDATE':
        response = await ApiService.put(`${endpoint}/${item.data.id}`, item.data);
        break;
      case 'DELETE':
        response = await ApiService.delete(`${endpoint}/${item.data.id}`);
        break;
    }

    if (!response?.success) {
      throw new Error(`API request failed for item ${item.id}`);
    }
  }

  private static async handleSyncError(item: SyncItem, error: any): Promise<void> {
    const updatedItem = {
      ...item,
      retries: item.retries + 1,
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };

    if (updatedItem.retries >= this.MAX_RETRIES) {
      // Archiver l'item qui a échoué
      await IndexedDBService.add('sync_failures', updatedItem);
      await IndexedDBService.delete(this.SYNC_QUEUE_STORE, item.id);
    } else {
      await IndexedDBService.update(this.SYNC_QUEUE_STORE, updatedItem);
    }
  }

  private static startSync(): void {
    if (this.syncInterval) return;
    
    this.processSyncQueue(); // Synchronisation immédiate
    this.syncInterval = setInterval(() => {
      this.processSyncQueue();
    }, this.SYNC_INTERVAL);
  }

  private static stopSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  static async getSyncStatus(): Promise<{
    pendingCount: number;
    failedCount: number;
    lastSync?: string;
  }> {
    const [pending, failed] = await Promise.all([
      IndexedDBService.getByIndex(this.SYNC_QUEUE_STORE, 'status', 'pending'),
      IndexedDBService.getByIndex(this.SYNC_QUEUE_STORE, 'status', 'failed')
    ]);

    const lastSync = await IndexedDBService.get(this.STATUS_STORE, 'lastSync');

    let lastSyncTimestamp: string | undefined = undefined;
    if (typeof lastSync === 'object' && lastSync !== null && 'timestamp' in lastSync && typeof (lastSync as any).timestamp === 'string') {
      lastSyncTimestamp = (lastSync as any).timestamp;
    }

    return {
      pendingCount: pending.length,
      failedCount: failed.length,
      lastSync: lastSyncTimestamp
    };
  }
}