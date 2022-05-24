const fs = require('fs');
const path = require('path');

const pathToComponents = path.join(__dirname,'components');
const pathFromTemplate = path.join(__dirname, 'template.html');
const pathToProDist = path.join(__dirname, 'project-dist');
const pathToHTML = path.join(__dirname, 'project-dist', 'index.html');
const pathFromStyles = path.join(__dirname, 'styles');
const pathToStyles = path.join(__dirname, 'project-dist', 'style.css');
const pathFromAssets = path.join(__dirname, 'assets');
const pathToAssets = path.join(pathToProDist,  'assets');
let flag = false;


fs.mkdir(pathToProDist,{ recursive: true },(error) => {
  if (error) {
      throw error;
  }
});


fs.unlink(pathToStyles, error =>{
  if (error) null;
});
fs.readdir(pathFromStyles, {encoding: 'utf-8'}, (error, arr) => {
  if (error) {
    throw error;
  }
  else {
    for ( let i = 0; i < arr.length; i++ ) {
      if ( path.extname(arr[i]) === '.css' ){
        fs.readFile(pathFromStyles + '/' + arr[i], (error, data) => {
          if (error) {
            throw error;
          }
          else {
            fs.appendFile(pathToStyles, data,(error) => {
            if (error) {
              throw error;
            }
            });
          }
        });
      }
    }
  }});




async function deleteAssets (toAssets) {
  if (flag) {
  fs.readdir(toAssets,{encoding:'utf-8', withFileTypes: true}, (error, array) => {
    if (error) {
      throw error;
    }
    else {
      array.forEach(file => {
        if (file.isFile()) {
          fs.unlink(path.join(toAssets,file.name),(error) => {
            if (error) {
              throw error;
            }
          });
        }
        else {
          deleteAssets(path.join(toAssets,file.name));
        }
      });
    }
  });
}
}
deleteAssets(pathToAssets).then(htmlBuilder());

function assets (fromAssets, toAssets){
  fs.mkdir(toAssets, {recursive: true}, (error) => {
    if (error) {
      throw error;
    }
  });
  fs.readdir(fromAssets, {withFileTypes: true}, (error,arr) => {
    if (error) {
      throw error;
    }
    else {
      arr.forEach(file =>{
        if (file.isFile()) {
          fs.copyFile(path.join(fromAssets, file.name), path.join(toAssets, file.name),(error) => {
            if (error) {
              throw error;
            }
          });
        } else {
          assets(path.join(fromAssets, file.name), path.join(toAssets, file.name));
        }
      });
    }
  }); 
  flag = true;
}
assets(pathFromAssets, pathToAssets);  



function htmlBuilder() { 
  const templateStream = fs.createReadStream(pathFromTemplate,'utf-8');
  templateStream.on('data', (data) => {
    let string = data.toString();
    fs.readdir(pathToComponents,{encoding:'utf-8',withFileTypes: true}, (error,array) => {
      if (error) {
        throw error;
      }
      else {
        array.forEach(file => {
          const fileStream = fs.createReadStream(pathToComponents + '/' + file.name);
          fileStream.on('data', (fileData) => {
            const regexp = new RegExp(`{{${file.name.split('.')[0]}}}`,'gi');
            string = string.replace(regexp, fileData.toString());
            fs.writeFile(pathToHTML,string,(error) => {
              if (error) {
                throw error;
              }
            });
          });
        });
      }
    });
  });
}
