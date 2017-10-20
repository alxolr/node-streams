const ToFileStream = require('./lib/to-file-stream');

const tfs = new ToFileStream();

tfs.write({ path: 'test1.txt', content: 'Hello' });
tfs.write({ path: 'test2.txt', content: 'Node.js' });
tfs.write({ path: 'test3.txt', content: 'Streams' });

tfs.end(() => {
  console.log('All files created');
});
