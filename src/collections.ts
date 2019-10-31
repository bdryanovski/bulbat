import { existsSync, unlinkSync } from 'fs';
import { decrypt } from './utils/decrypt';
import { encryptBuffer } from './utils/encrypt';

export type StorageContent = any[];
export type StorageReducer = (previousValue?: any, currentValue?: any, currentIndex?: number, source?: []) => {};
export interface CollectionProps {
  path?: string;
  password?: string;
  dryRun?: boolean;
}

export class Collection {
  private name: string;
  private storage: StorageContent = [];
  private password: string;
  private file: string = '';
  private retryAttempts: number = 2;
  private retryCount: number = 0;
  private dryRun: boolean = false;

  constructor(name: string, props: CollectionProps = {}) {
    this.name = name;
    if (this.name === undefined) {
      throw new Error('Collection require a name');
    }
    this.password = props.password = '';
    this.file = `${props.path || __dirname}/${this.name}_collection`;

    this.dryRun = props.dryRun;

    if (existsSync(this.file)) {
      this.load();
    }
  }

  public get data(): StorageContent {
    return this.storage;
  }

  public get last() {
    return this.storage[this.storage.length - 1];
  }

  public insert(data: any): void {
    this.storage.push(data);
    this.sync();
  }

  public drop(): void {
    this.storage = [];
    if (existsSync(this.file)) {
      unlinkSync(this.file);
    }
  }

  public reduce(reduceMethod: StorageReducer): void {
    this.storage = this.storage.reduce(reduceMethod, []);
    this.sync();
  }

  // PRIVATE

  private load(): Promise<any> {
    if (this.dryRun) {
      return;
    }
    return decrypt(this.file, this.password)
      .then(content => {
        try {
          const json = JSON.parse(content);
          this.storage = json.data;
          this.retryCount = 0; // Reset counter
        } catch (error) {
          this.load();
        }
      })
      .catch(e => {
        if (this.retryCount >= this.retryAttempts) {
          return;
        }
        const t1 = setTimeout(() => {
          this.load();
          clearTimeout(t1);
        }, 500);
      });
  }

  private sync(): void {
    if (this.dryRun) {
      return;
    }
    if (this.storage.length > 0) {
      const content = {
        name: this.name,
        data: this.storage,
      };
      encryptBuffer(content, this.file, this.password);
    }
  }
}
