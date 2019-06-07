var fs = require('fs');
var data = 'W3Cschool教程官网网址：www.w3cschool.cn';
var writeStream = fs.createWriteStream('output.txt');

writeStream.write(data, 'UTF8');
writeStream.end();

writeStream.on('finish', function () {
    console.log('finish writting.')
});
writeStream.on('error', function (err) {
    console.error(err.stack)
});
