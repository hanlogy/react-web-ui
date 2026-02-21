export interface IndexSchema<RecordT extends object> {
  readonly name: string;
  readonly keyPath:
    | Extract<keyof RecordT, string>
    | readonly Extract<keyof RecordT, string>[];

  readonly options?: IDBIndexParameters;
}

export interface ObjectStoreSchema<RecordT extends object> {
  readonly keyPath: Extract<keyof RecordT, string>;
  readonly autoIncrement?: boolean;
  readonly indexes?: readonly IndexSchema<RecordT>[];
}

export type DBSchema<T extends object> = {
  // [K in keyof T]: object;
  [K in keyof T]: T[K] extends object ? T[K] : never;
};

export type ObjectStoreSchemas<SchemaT extends DBSchema<SchemaT>> = {
  [K in keyof SchemaT]: ObjectStoreSchema<SchemaT[K]>;
};
