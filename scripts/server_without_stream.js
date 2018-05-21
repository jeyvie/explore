const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  console.log('start reading');
  fs.readFile('./big.file', (err, data) => {
    if (err) throw err;
  
    res.end(data);

    console.log('finish reading');
    
  });
});

server.listen(8000);

console.log('waiting for request');