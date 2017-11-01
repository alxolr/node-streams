const childProcess = require('child_process');
const net = require('net');
const path = require('path');

function multiplexChannels(source, destination) {
  const totalChannels = source.length;

  for (let i = 0; i <= sources.length; i++) {
    sources[i]
      .on('readable', function send(i) {
        let chunk;
        while ((chunk = this.read()) !== null) {
          const outBuff = new Buffer(1 + 4 + chunk.length);
          outBuff.writeUInt8(i, 0);
          outBuff.writeUInt32BE(chunk.length, 1);
          chunk.copy(outBuff, 5);
          console.log(`Seding packet to channel ${i}`);
          destination.write(outBuff);
        };
      }.bind(sources[i], i))
      .on('end', () => {
        if (--totalChannels === 0) {
          destination.end();
        }
      });
  }
}

const socket = net.connect(3000, () => {
  const fork = childProcess.fork(
    process.argv[2],
    process.argv.slice(3),
    { silent: true },
  );
  multiplexChannels([fork.stdout, fork.stderr], socket);
});
