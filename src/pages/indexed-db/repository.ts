import type { ObjectStoreSchemas } from '../../../lib/indexed-db/types';
import { IndexedDB } from '../../../lib/indexed-db/IndexedDB';

interface MyDBSchema {
  todo: {
    id: string;
    name: string;
    isChecked: boolean;
  };

  settings: {
    key: string;
    value: string;
  };
}

let dbPromise: Promise<IndexedDB<MyDBSchema>> | null = null;

const stores: ObjectStoreSchemas<MyDBSchema> = {
  todo: {
    keyPath: 'id',
    indexes: [{ name: 'isChecked', keyPath: 'isChecked' }],
  },
  settings: {
    keyPath: 'key',
  },
};

export function openDB() {
  return (dbPromise ??= IndexedDB.open<MyDBSchema>({
    name: 'ExampleDB',
    version: 1,
    stores,
    onBlocked: () => {
      console.warn('ExampleDB open/upgrade blocked by another tab.');
    },
    onVersionChange: () => {
      // current connection got closed due to another tab upgrading
      dbPromise = null;
    },
  }).catch((e) => {
    // allow retry after failure
    dbPromise = null;
    throw e;
  }));
}
