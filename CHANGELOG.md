## Changelog

#### 0.0.2
  Little patches on how some of the methods are working

  * `Collection#drop` was not clearing properly the storage only removing the file if it was there.
  * `Database#collection` will return new Collection without the need to call `Database#add` to add to `Database.records`
  * `Database#add` now is returning the Collection instance so this is valid syntax now:
  ```typescript
  const posts = db.add('posts');
  // => this is same as
  db.add('posts');
  const posts = db.collection('posts');
  ```
  * There is `CollectionProps.dryRun` that will make the collection to run only in memory. All changes will be lost
  when the instance is deleted or the process end. No file will be created.
  * Added more unit-tests

#### 0.0.1
  Init release