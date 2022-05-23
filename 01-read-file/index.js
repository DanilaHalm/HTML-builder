const fs = require('fs');
const path = require('path');

const pathText = path.join(__dirname, 'text.txt');
const stream = new fs.createReadStream(pathText, 'utf-8');

stream.on('readable', (error) => {
  if (error) {
    throw error;
  }
  else {
    let data = stream.read();
    data !== null ? console.log(data) : null;
  }
});