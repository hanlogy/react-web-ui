import { requestToPromise, transactionDone } from './helpers';
import type { ObjectStoreSchemas, DBSchema } from './types';

export class IndexedDB<SchemaT extends DBSchema<SchemaT>> {
  private constructor(db: IDBDatabase, onVersionChange?: () => void) {
    this.db = db;

    // Close cleanly if another tab upgrades the DB
    this.db.onversionchange = () => {
      this.db.close();
      onVersionChange?.();
    };
  }

  private db: IDBDatabase;

  static async open<SchemaT extends DBSchema<SchemaT>>({
    name,
    version,
    stores,
    onBlocked,
    onUpgrade,
    onVersionChange,
  }: {
    name: string;
    version: number;
    stores: ObjectStoreSchemas<SchemaT>;
    onBlocked?: () => void;
    onUpgrade?: (ctx: {
      db: IDBDatabase;
      transaction: IDBTransaction;
      oldVersion: number;
      newVersion: number | null;
    }) => void;
    onVersionChange?: () => void;
  }): Promise<IndexedDB<SchemaT>> {
    const request = indexedDB.open(name, version);

    // Upgrades are additive: create missing stores/indexes only.
    // Existing stores/indexes are not removed or modified (keyPath/options
    // changes require manual migration in `onUpgrade`).
    request.onupgradeneeded = ({ oldVersion, newVersion }) => {
      const db = request.result;
      const transaction = request.transaction;

      if (!transaction) {
        throw new Error('IndexedDB upgrade transaction is missing.');
      }

      for (const storeName in stores) {
        const config = stores[storeName];

        let store: IDBObjectStore;
        if (db.objectStoreNames.contains(storeName)) {
          store = transaction.objectStore(storeName);
        } else {
          store = db.createObjectStore(storeName, {
            keyPath: config.keyPath,
            autoIncrement: config.autoIncrement,
          });
        }

        for (const index of config.indexes ?? []) {
          if (!store.indexNames.contains(index.name)) {
            const keyPath = Array.isArray(index.keyPath)
              ? [...index.keyPath]
              : index.keyPath;
            store.createIndex(index.name, keyPath, index.options);
          }
        }
      }

      onUpgrade?.({ db, transaction, oldVersion, newVersion });
    };

    request.onblocked = () => onBlocked?.();

    return new IndexedDB<SchemaT>(
      await requestToPromise(request),
      onVersionChange,
    );
  }

  close() {
    this.db.close();
  }

  private async withStore<K extends keyof SchemaT, R>(
    store: K,
    mode: IDBTransactionMode,
    operation: (objectStore: IDBObjectStore) => IDBRequest<R>,
  ): Promise<R> {
    const transaction = this.db.transaction(String(store), mode);
    const objectStore = transaction.objectStore(String(store));

    try {
      const result = await requestToPromise(operation(objectStore));
      await transactionDone(transaction);
      return result;
    } catch (error) {
      try {
        transaction.abort();
      } catch {
        //
      }
      throw error;
    }
  }

  async get<K extends keyof SchemaT>(
    store: K,
    key: IDBValidKey,
  ): Promise<SchemaT[K] | undefined> {
    const value = await this.withStore<K, SchemaT[K]>(store, 'readonly', (e) =>
      e.get(key),
    );

    return value ?? undefined;
  }

  async put<K extends keyof SchemaT>(
    store: K,
    value: SchemaT[K],
  ): Promise<IDBValidKey> {
    return this.withStore(store, 'readwrite', (store) => store.put(value));
  }

  async delete<K extends keyof SchemaT>(
    store: K,
    key: IDBValidKey,
  ): Promise<void> {
    await this.withStore(store, 'readwrite', (store) => store.delete(key));
  }

  async getAll<K extends keyof SchemaT>(store: K): Promise<SchemaT[K][]> {
    return this.withStore<K, SchemaT[K][]>(store, 'readonly', (store) =>
      store.getAll(),
    );
  }

  async clear<K extends keyof SchemaT>(store: K): Promise<void> {
    await this.withStore(store, 'readwrite', (store) => store.clear());
  }
}

/*
 * DEV NOTES:
 * https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology
 * -  A record value could include anything that can be expressed in JavaScript,
 *    including boolean, number, string, date, object, array, regexp, undefined,
 *    and null.
 *
 * This helper assumes each object store contains object records because it
 * requires an in-line key (`keyPath`) and supports property-based indexes.
 *
 * To store single settings (e.g. theme), use a dedicated store like `settings`
 * with object records:
 *   { key: 'theme', value: 'dark' }
 */
