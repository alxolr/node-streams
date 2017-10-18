const ReplaceSteam = require('./lib/replace-stream');

process.stdin
  .pipe(new ReplaceSteam(process.argv[2], process.argv[3]))
  .pipe(process.stdout);
