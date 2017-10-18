const ToFileStream = require('./lib/to-file-stream');

const tfs = new ToFileStream();

tfs.write({ path: 'hreni1.txt', content: 'Hello' });
tfs.write({ path: 'hreni2.txt', content: 'Node.js' });
tfs.write({ path: 'hreni3.txt', content: 'Streams' });

tfs.end(() => {
  console.log('All files created');
});
