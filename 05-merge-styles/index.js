const fs = require('fs');
const path = require('path');
const pathStyles = path.join(__dirname, 'styles');
const pathNewStyle = path.join(__dirname, 'project-dist', 'bundle.css');

fs.unlink(pathNewStyle, error =>{
  if (error) null;
});

fs.readdir(pathStyles, {encoding: 'utf-8'}, (error, arr) => {
  if (error) {
      throw error;
  }
  else {
    for ( let i = 0; i < arr.length; i++ ) {
      if ( path.extname(arr[i]) === '.css' ){
        fs.readFile(pathStyles + '/' + arr[i], (error, data) => {
          if (error) {
            throw error;
          }
          else {
            fs.appendFile(pathNewStyle, data,(error) => {
              if (error) {
                throw error;
              }
            });
          }
        });
      }
    }
  }});