var fs = require('fs');

fs.readFile('input.txt', 'utf8',function (err, data) {
    if (err) {
        console.error(err)
    } else {
        console.log(data)
    }
})