const zlib = require('zlib');
const crypto = require('crypto');
const combine = require('multipipe');

module.exports = {
  compressAndEncrypt(password) {
    return combine(
      zlib.createGzip(),
      crypto.createCipher('aes192', password),
    );
  },
  decryptAndDecompress(password) {
    return combine(
      crypto.createDecipher('aes192', password),
      zlib.createGunzip(),
    );
  },
};