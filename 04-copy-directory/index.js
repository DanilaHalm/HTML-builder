const fs = require('fs');
const path = require('path');

const pathFiles = path.join(__dirname, 'files');
const pathToCopy = path.join(__dirname,'files-copy');

fs.mkdir(pathToCopy,{ recursive: true },(error) => {
  if (error) {
    throw error;
  };
});

function deleteFiles() {
  fs.readdir(pathToCopy, (error, arr) => {
    if (error){
      throw error;
    }
    else {
      for ( let i = 0; i < arr.length; i++ ) {
        fs.unlink(pathToCopy + '/' + arr[i], error =>{
          if (error) {
            throw error;
          };
        });
      }
    }
  });
}

function copyFiles() {
  fs.readdir(pathFiles, (error, arr)=> {
    if (error){
      throw error;
    }
    else {
      for ( let file of arr ){
        fs.copyFile(pathFiles + '/' + file, pathToCopy + '/' + file, error =>{
          if (error){
            throw error;
          }
        });
      }
    }
  });
}

async function runScript() {
  const promise = await deleteFiles();
  return promise;
}
runScript().then(copyFiles())
