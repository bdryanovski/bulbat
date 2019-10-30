## Bulbat
![bulbat](logo.png)

The name is from [random](https://pokemon.alexonsager.net/1/42) generated Pokémon, between Bulbasaur and Golbat.

This is in-memory quick storage that could be synced to the disk if neaded inside an encrypted file.

**WARNING**

**The current implementation is pretty basic in terms of encryption. So don't put any sensitive data**

### Usage

Install the package with
```bash
npm install --save bulbat
```
Import and use
```typescript
import { Database } from 'bulbat';

const db = new Database();

const post = {
  id: 42,
  title: 'Welcome to my blog!',
  content: '...'
};

db.collection('posts').insert(post);

db.collection('posts').data.map((post) => {
  console.log(post);
});
```

You could use the Collection only without the need of the
`Database` instance:

```typescript
import { Collection } from 'bulbat'

const posts = new Collection('posts');

posts.insert(/* data */);

posts.data.map((post) => {
  console.log(post)
});
```

The collection provide an `reduce` method that could be used to sort or change the content of the collection,
internal state. Right now the only way to make bulk actions to the storage.

```typescript
import { Collection } from 'bulbat';

const col = new Collection('posts');

// insert some data into the collection

col.reduce((result, post) => {
  if (post.status !== 'deleted') {
    result.push(post);
  }
  return result;
});

col.data
// => only posts that are not `deleted`
```

### Development

```bash
npm install
```

To start development run:

```bash
npm run develop
```

Other commands:
```bash
# to code format the code with prettier
npm run format

# to lint the code for errors with tslint
npm run lint

# to build the project
npm run build

# to run tests
npm run test

# or
npm run test:watch
```