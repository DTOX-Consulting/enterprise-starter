type DBOperationResult<T> = {
  data?: T;
  error?: string;
  success: boolean;
};

type DBConfig = {
  dbName: string;
  version: number;
  storeName: string;
};

export class IndexedDBStore {
  private dbName: string;
  private version: number;
  private storeName: string;

  constructor(config: DBConfig) {
    this.dbName = config.dbName;
    this.version = config.version;
    this.storeName = config.storeName;
  }

  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async getItem<T>(key: string): Promise<DBOperationResult<T>> {
    try {
      const db = await this.openDB();
      return await new Promise((resolve) => {
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.get(key);

        request.onsuccess = () => {
          resolve({
            success: true,
            data: request.result as T
          });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: 'Failed to retrieve data'
          });
        };

        transaction.oncomplete = () => {
          db.close();
        };
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async setItem<T>(key: string, value: T): Promise<DBOperationResult<void>> {
    try {
      const db = await this.openDB();
      return await new Promise((resolve) => {
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.put(value, key);

        request.onsuccess = () => {
          resolve({
            success: true
          });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: 'Failed to store data'
          });
        };

        transaction.oncomplete = () => {
          db.close();
        };
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async removeItem(key: string): Promise<DBOperationResult<void>> {
    try {
      const db = await this.openDB();
      return await new Promise((resolve) => {
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(key);

        request.onsuccess = () => {
          resolve({
            success: true
          });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: 'Failed to remove data'
          });
        };

        transaction.oncomplete = () => {
          db.close();
        };
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getAllKeys(): Promise<DBOperationResult<string[]>> {
    try {
      const db = await this.openDB();
      return await new Promise((resolve) => {
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAllKeys();

        request.onsuccess = () => {
          resolve({
            success: true,
            data: request.result as string[]
          });
        };

        request.onerror = () => {
          resolve({
            success: false,
            error: 'Failed to retrieve keys'
          });
        };

        transaction.oncomplete = () => {
          db.close();
        };
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}
