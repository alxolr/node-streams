const fs = require('fs');
const combine = require('multipipe');

const { compressAndEncrypt } = require('./lib/compress-and-encrypt');

combine(
  fs.createReadStream(process.argv[3]),
  compressAndEncrypt(process.argv[2]),
  fs.createWriteStream(`${process.argv[3]}.gz.aes`),
).on('error', (err) => {
  console.log(err);
});
