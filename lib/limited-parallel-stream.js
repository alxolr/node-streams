const { Transform } = require('stream');

class LimitedParallelStream extends Transform {
  constructor(transformFn, concurrency = 2) {
    super({ objectMode: true });
    this.transformFn = transformFn;
    this.running = 0;
    this.terminateCallback = null;
    this.continueCallback = null;
    this.concurrency = concurrency;
  }

  _transform(chunk, encoding, done) {
    this.running += 1;
    this.transformFn(chunk, encoding, this.onComplete.bind(this));
    if (this.running < this.concurrency) {
      done();
    } else {
      this.continueCallback = done;
    }
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCallback = done;
    } else {
      done();
    }
  }

  onComplete(err, chunk) {
    this.running -= 1;
    if (err) {
      return this.emit('error', err);
    }

    const tmpCallback = this.continueCallback;
    this.continueCallback = null;

    if (tmpCallback) {
      tmpCallback();
    }

    if (this.running === 0) {
      if (this.terminateCallback) {
        this.terminateCallback();
      }
    }
  }
}

module.exports = LimitedParallelStream;
