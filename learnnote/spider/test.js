const fs = require('fs');
const readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

const p = readFile('/etc/fstab1');

p
  .then(data => console.log(data.toString()))
  .catch(error => console.log(error))