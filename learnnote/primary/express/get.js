var express = require('express');
var app = express();

app.use(express.static('express/public'))


app.get('/index.htm', function (req, res) {
    res.sendFile(__dirname + '/' + 'index.get.htm');
})

app.get('/process_get', function (req, res) {
    resposne = {
        first_name:req.query.first_name,
        last_name:req.query.last_name,
    };
    console.log(resposne)
    res.end(JSON.stringify(resposne));
})

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('express demo3, address is http://%s:%s', host, port)
})