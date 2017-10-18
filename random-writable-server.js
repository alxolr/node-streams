const chance = require('chance').Chance();

require('http').createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/plain' });

  function generateMore() {
    while (chance.bool({ likelihood: 95 })) {
      const shouldContinue = res.write(chance.string({ length: (16 * 1024) - 1 }));
      if (!shouldContinue) {
        console.log('Backpressure');
        return res.once('drain', generateMore);
      }
    }

    return res.end('\nThe end...\n');
  }

  res.on('finish', () => {
    console.log('All data was sent');
  });
  generateMore();
}).listen(8080, () => {
  console.log('Listening');
});
