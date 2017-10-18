const { Writable } = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class ToFileStream extends Writable {
  constructor() {
    super({ objectMode: true });
  }

  _write(chunk, encoding, cb) {
    const self = this;
    mkdirp(path.dirname(chunk.path), (err) => {
      if (err) return cb(err);

      return fs.writeFile(chunk.path, chunk.content, cb);
    });
  }
}

module.exports = ToFileStream;
