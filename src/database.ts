import { Collection, CollectionProps } from './collections';

export interface CollectionList {
  [CollectionName: string]: Collection;
}

export class Database {
  private records: CollectionList = {};
  private collectionProps: CollectionProps;

  constructor(props?: CollectionProps) {
    this.collectionProps = props || {};
  }

  public add(name: string, props?: CollectionProps): Collection {
    this.records[name] = new Collection(name, props || this.collectionProps);
    return this.records[name];
  }

  public list(): CollectionList {
    return this.records;
  }

  public collection(name: string): Collection {
    return this.records[name] === undefined ? this.add(name) : this.records[name];
  }

  public dropAll() {
    Object.values(this.records).forEach(collection => {
      collection.drop();
    });
  }
}
