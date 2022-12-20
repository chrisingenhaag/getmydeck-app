import process from 'node:process';

process.on('SIGINT', function () {
  process.exit();
});
process.on('SIGTERM', function () {
  process.exit();
});
