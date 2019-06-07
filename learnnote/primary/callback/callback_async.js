var fs = require('fs');

fs.readFile(
    'input.txt', function (err, data) {
        if (err){
            console.error(err);
        } else {
            console.log(data.toString())
        }
    }
)

console.log('finished!')