const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  console.log('start reading');
  const src = fs.createReadStream('./big.file');
  src.pipe(res);
  console.log('finish reading');
});

server.listen(8000);

console.log('waiting for request');