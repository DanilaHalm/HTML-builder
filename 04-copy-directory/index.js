const fs = require('fs');
const path = require('path');

const pathFiles = path.join(__dirname, 'files');
const pathToCopy = path.join(__dirname,'files-copy');

fs.mkdir(pathToCopy,{ recursive: true },(error) => {
  if (error) {
    throw error
  };
});

fs.readdir(pathToCopy, (error, arr) => {
  for ( let i = 0; i < arr.length; i++ ) {
    fs.unlink(pathToCopy + '/' + arr[i], error =>{
      if (error) {
        throw error;
      };
    });
  }
});

fs.readdir(pathFiles, (error, arr)=> {
  for ( let file of arr ){
    fs.copyFile(pathFiles + '/' + file, pathToCopy + '/' + file, error =>{
      if (error) console.error(error);
    });
  }
});
