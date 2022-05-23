const fs = require('fs');
const path = require('path');

const way = path.join(__dirname, 'secret-folder');

fs.readdir(way, {
  encoding: 'utf-8',
  withFileTypes: true
}, (error, arr) => {
  if (error) {
    throw error;
  }
  else {
    arr.forEach(file => {
      if (file.isFile()) {
        let pathFile = path.join(way, `${file.name}`);
        fs.stat(pathFile, (error, stats) => {
          if (error) {
            throw error;
          }
          else {
            console.log(file.name.split('.')[0] + ' - ' + path.extname(file.name).slice(1) + ' - ' + stats.size / 1024 + 'kb');
          }
        });
      }});
  }
});