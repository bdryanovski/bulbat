import { Database } from './database'
import { Collection } from './collections';

describe('Database', () => {
  it('should return instance', () => {
    const db = new Database();
    expect(db).toBeDefined();
  })

  it('should add new collection to the list', () => {
    const db = new Database();
    expect(Object.keys(db.list())).toEqual([])
    db.add('posts')
    expect(Object.keys(db.list())).toEqual(['posts'])
  })

  it('should get access to collection', () => {
    const db = new Database();
    expect(Object.keys(db.list())).toEqual([])
    const col = db.collection('posts')
    expect(Object.keys(db.list())).toEqual(['posts'])
    expect(col).toBeInstanceOf(Collection)
  })

  it('should drop everything', () => {
    const db = new Database();
    const col = db.collection('posts');
    col.insert(1)
    col.insert(2)

    expect(col.data).toEqual([1,2])
    db.dropAll()

    expect(col.data).toEqual([]);
  })
})