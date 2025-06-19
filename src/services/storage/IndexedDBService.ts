export class IndexedDBService {
  private static DB_NAME = 'wanzo_accounting';
  private static DB_VERSION = 5; // Augmenté de 4 à 5 pour la mise à jour du schéma
  private static db: IDBDatabase | null = null;

  static async initDB(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => {
        console.error('Database error:', request.error);
        reject(request.error);
      };
      
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Création des stores nécessaires
        if (!db.objectStoreNames.contains('journal_entries')) {
          const journalStore = db.createObjectStore('journal_entries', { keyPath: 'id' });
          journalStore.createIndex('date', 'date');
          journalStore.createIndex('journalType', 'journalType');
          journalStore.createIndex('status', 'status');
        }

        if (!db.objectStoreNames.contains('accounts')) {
          const accountsStore = db.createObjectStore('accounts', { keyPath: 'id' });
          accountsStore.createIndex('code', 'code', { unique: true });
          accountsStore.createIndex('type', 'type');
          accountsStore.createIndex('standard', 'standard');
        }

        if (!db.objectStoreNames.contains('fiscal_years')) {
          const fiscalYearsStore = db.createObjectStore('fiscal_years', { keyPath: 'id' });
          fiscalYearsStore.createIndex('code', 'code', { unique: true });
          fiscalYearsStore.createIndex('status', 'status');
        }

        if (!db.objectStoreNames.contains('analytics')) {
          const analyticsStore = db.createObjectStore('analytics', { keyPath: 'id' });
          analyticsStore.createIndex('date', 'date');
          analyticsStore.createIndex('category', 'category');
        }

        if (!db.objectStoreNames.contains('declarations')) {
          const declarationsStore = db.createObjectStore('declarations', { keyPath: 'id' });
          declarationsStore.createIndex('type', 'type');
          declarationsStore.createIndex('period', 'period');
          declarationsStore.createIndex('status', 'status');
        }

        if (!db.objectStoreNames.contains('audit_history')) {
          const auditStore = db.createObjectStore('audit_history', { keyPath: 'id' });
          auditStore.createIndex('fiscalYearId', 'fiscalYearId');
          auditStore.createIndex('date', 'date');
        }

        if (!db.objectStoreNames.contains('sync_queue')) {
          const syncQueueStore = db.createObjectStore('sync_queue', { keyPath: 'id' });
          syncQueueStore.createIndex('timestamp', 'timestamp');
          syncQueueStore.createIndex('entity', 'entity');
          syncQueueStore.createIndex('status', 'status');
        }

        if (!db.objectStoreNames.contains('chat_history')) {
          const chatStore = db.createObjectStore('chat_history', { keyPath: 'id' });
          chatStore.createIndex('timestamp', 'timestamp');
          chatStore.createIndex('conversationId', 'conversationId');
        }
        
        if (!db.objectStoreNames.contains('dashboard_data')) {
          const dashboardStore = db.createObjectStore('dashboard_data', { keyPath: 'id' });
          dashboardStore.createIndex('timestamp', 'timestamp');
        }
        
        // Nouveau store pour les données de l'organisation
        if (!db.objectStoreNames.contains('organization')) {
          const organizationStore = db.createObjectStore('organization', { keyPath: 'id' });
          organizationStore.createIndex('updatedAt', 'updatedAt');
        }
      };
    });
  }

  static async get<T>(storeName: string, key: string): Promise<T | undefined> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  static async getAll<T>(storeName: string, query?: { index: string; value: any }): Promise<T[]> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      let request;

      if (query) {
        const index = store.index(query.index);
        request = index.getAll(query.value);
      } else {
        request = store.getAll();
      }

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  static async add<T extends { id: string }>(storeName: string, data: T): Promise<void> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  static async update<T>(storeName: string, data: T): Promise<void> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  static async delete(storeName: string, key: string): Promise<void> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  static async clear(storeName: string): Promise<void> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  static async count(storeName: string): Promise<number> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.count();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  static async getByIndex<T>(
    storeName: string, 
    indexName: string, 
    value: any
  ): Promise<T[]> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}