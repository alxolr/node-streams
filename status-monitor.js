const fs = require('fs');
const split = require('split');
const request = require('request');
const ParallelStream = require('./lib/unordered-parallel-stream');

function transform(url, enc, done) {
  if (!url) return done();

  return request.head(url, (err) => {
    this.push(`${url} is ${err ? `down ${err.message}` : 'up'}\n`);
    done();
  });
}

fs.createReadStream(process.argv[2])
  .pipe(split())
  .pipe(new ParallelStream(transform))
  .pipe(fs.createWriteStream('results.txt'))
  .on('finish', () => {
    console.log('All urls were checked');
  });
