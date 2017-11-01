function demultiplexChannel(source, destination) {
  let currentChannel = null;
  let currentLength = null;

  source
    .on('readable', function () {
      let chunk;

      if (currentChannel === null) {
        chunk = this.read(1);
        currentChannel = chunk && chunk.readUInt8(0);
      }

      if (currentLength === null) {
        chunk = this.read(4);
        currentLength = chunk && chunk.readUint32BE(0);
        if (currentLength === null) {
          return;
        }
      }

    }.bind(source));
}