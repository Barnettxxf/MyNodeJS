var fs = require('fs');

fs.open('input.txt', function (err, fd) {
    if (err) {
        console.log(err)
        return;
    }

    var buf = Buffer(8);
    fs.read(fd, buf, 0, 8, function (err, bytesRead, buffer) {
        if (err) {
            console.log(err)
            return
        }
        console.log('bytesRead: ', bytesRead)
        console.log('buffer: ', buffer)
    })
})
