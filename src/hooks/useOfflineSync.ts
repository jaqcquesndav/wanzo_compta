import { useState, useEffect } from 'react';
import { LocalStorageService } from '../services/storage/LocalStorageService';
import { StorageKeys } from '../services/storage/StorageKeys';

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState<any[]>([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline && pendingSync.length > 0) {
      syncPendingChanges();
    }
  }, [isOnline, pendingSync]);

  const addPendingSync = (action: any) => {
    setPendingSync(prev => [...prev, action]);
    LocalStorageService.set(StorageKeys.JOURNAL_ENTRIES, pendingSync);
  };

  const syncPendingChanges = async () => {
    // Implement sync logic here
    console.log('Syncing pending changes...');
  };

  return {
    isOnline,
    addPendingSync,
    pendingSync
  };
}