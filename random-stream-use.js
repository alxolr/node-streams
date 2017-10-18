const RandomStream = require('./lib/random-stream');

const randomStream = new RandomStream();

randomStream.on('readable', () => {
  let chunk;
  while ((chunk = randomStream.read()) !== null) {
    console.log(`Chunk received (${chunk.length}) ${chunk.toString()}`);
  }
});
