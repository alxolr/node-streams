const fs = require('fs');
const crypto = require('crypto');

const sha512 = crypto.createHash('sha512');
sha512.setEncoding('base64');

const md5 = crypto.createHash('md5');
md5.setEncoding('base64');

fs.createReadStream(process.argv[2])
  .pipe(sha512)
  .pipe(fs.createWriteStream(`${process.argv[2]}.sha512`));

fs.createReadStream(process.argv[2])
  .pipe(md5)
  .pipe(fs.createWriteStream(`${process.argv[2]}.md5`));