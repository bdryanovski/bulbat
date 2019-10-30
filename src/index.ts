import { Collection } from './collections';
import { Database } from './database';

export * from './collections';
export * from './database';

// Test
const node = new Collection('notes');

node.insert('hello World');
node.insert(123);
node.insert({ a: 'hello' });
node.insert([1, 2, 3]);
node.insert(true);
node.drop();

// Test
const db = new Database();

db.add('posts');
db.add('news');

console.log(db.list());

db.collection('posts').insert('this is it');
console.log(db.collection('posts').data);

db.collection('posts').drop();

db.dropAll();
