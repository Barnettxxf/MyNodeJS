var fs = require('fs');
var zlib = require('zlib');


fs.createReadStream('input.compress.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('input.compress.txt'))

console.log('finished.')