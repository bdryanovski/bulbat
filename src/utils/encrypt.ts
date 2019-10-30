import { createCipheriv, createHash, randomBytes } from 'crypto';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { createGzip } from 'zlib';

import { Readable, Transform } from 'stream';

class AppendInitVect extends Transform {
  private initVect: Buffer;
  private appended: boolean;

  constructor(initVect: Buffer, opts?: any) {
    super(opts);
    this.initVect = initVect;
    this.appended = false;
  }

  public _transform(chunk, encoding, cb) {
    if (!this.appended) {
      this.push(this.initVect);
      this.appended = true;
    }
    this.push(chunk);
    cb();
  }
}

export function encryptBuffer(data: any, file: string, password: string) {
  return new Promise(resolve => {
    const initVect = randomBytes(16);

    const inStream = new Readable({
      read() {
        /* ... */
      },
    });

    inStream.push(JSON.stringify(data));
    inStream.push(null);

    inStream
      .pipe(createGzip())
      .pipe(
        createCipheriv(
          'aes256',
          createHash('sha256')
            .update(password)
            .digest(),
          initVect,
        ),
      )
      .pipe(new AppendInitVect(initVect))
      .pipe(createWriteStream(join(file)));

    inStream.on('end', () => {
      resolve();
    });
  });
}
