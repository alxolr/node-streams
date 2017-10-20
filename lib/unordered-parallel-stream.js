const { Transform } = require('stream');

class ParallelStream extends Transform {
  constructor(userTransform) {
    super({ objectMode: true });
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCallback = null;
  }

  _transform(chunk, enc, done) {
    this.running += 1;
    this.userTransform(chunk, enc, this.onComplete.bind(this));
    done();
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCallback = done;
    } else {
      done();
    }
  }

  onComplete(err) {
    this.running -= 1;

    if (err) {
      return this.emit('error', err);
    }

    if (this.running === 0) {
      return this.terminateCallback && this.terminateCallback();
    }

    return null;
  }
}

module.exports = ParallelStream;
