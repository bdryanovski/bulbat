import { createDecipheriv, createHash } from 'crypto';
import { createReadStream, existsSync } from 'fs';
import { createUnzip } from 'zlib';

import { Writable } from 'stream';

export function decrypt(file: string, password: string): any {
  return new Promise((resolve, reject) => {
    let content = '';
    let initVect;

    const readInitVect = createReadStream(file, { end: 15 });
    readInitVect.on('data', chunk => {
      initVect = chunk;
    });

    readInitVect.on('close', () => {
      if (initVect === undefined) {
        return reject({ error: 'No vector' });
      }

      if (!existsSync(file)) {
        return reject({ error: 'File not existing' });
      }

      const readStream = createReadStream(file, { start: 16 });
      const writableStream = new Writable();

      writableStream._write = (chunk, encoding, next) => {
        content += chunk.toString();
        next();
      };

      writableStream._final = error => {
        resolve(content);
      };

      readStream
        .pipe(
          createDecipheriv(
            'aes256',
            createHash('sha256')
              .update(password)
              .digest(),
            initVect,
          ),
        )
        .pipe(createUnzip())
        .pipe(writableStream);
    });
  });
}
