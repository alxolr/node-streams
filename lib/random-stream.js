const stream = require('stream');
const util = require('util');
const chance = require('chance').Chance();

function RandomStream(options) {
  stream.Readable.call(this, options);
}
util.inherits(RandomStream, stream.Readable);

RandomStream.prototype._read = function read(size) {
  const chunk = chance.string();
  process.stdout.write(`Pushing chunk of size ${chunk.length}`);
  this.push(chunk, 'utf8');
  if (chance.bool({ likelihood: 5 })) {
    this.push(null);
  }
};

module.exports = RandomStream;
