import { Collection } from './collections';

describe('Collection', () => {
  it('should be defined', () => {
    const col = new Collection('demo');
    expect(col).toBeDefined();
  });

  it('should throw error', () => {
    // @ts-ignore
    expect(() => new Collection()).toThrowError('Collection require a name');
  });

  describe('Methods', () => {
    let col: Collection;
    beforeEach(() => {
      col = new Collection('demo', { dryRun: true });
    });
    afterEach(() => {
      col.drop();
    });

    it('should let you insert and view data', () => {
      col.insert({ name: 'John', age: 42 });
      col.data.map(d => {
        expect(d).toEqual({ name: 'John', age: 42 });
      });
    });

    it('should let you reduce storage if needed', () => {
      col.insert(1);
      col.insert(2);
      col.insert(3);

      expect(col.data).toEqual([1, 2, 3]);

      col.reduce((result, value, index, initialStorage) => {
        result.push(value + index);
        result.push(initialStorage.length + index + value);
        return result;
      });

      expect(col.data).toEqual([1, 4, 3, 6, 5, 8]);
    });

    it('should get the last entry', () => {
      col.insert('hello');
      expect(col.last).toBe('hello');
    });
  });
});
