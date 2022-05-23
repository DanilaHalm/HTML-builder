const fs = require('fs');
const path = require('path');
const readline = require('readline');

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout});

const pathText = path.join(__dirname, 'text.txt');
const stream = fs.WriteStream(pathText);

(function writeFile() {
  interface.question('Введите какой-ниудь текст: ', (answer) => {
    if (answer === 'exit') {
      console.log('Текст успешно записан');
      interface.close();
    }
    else {
      stream.write(answer + '\n', (error) => {
        if (error) {
          throw error;
        }
        else {
          writeFile();
        }
      });
    }
  });
})();
interface.on('SIGINT',()=>{
  console.log('\nТекст успешно записан');
  interface.close();
});

