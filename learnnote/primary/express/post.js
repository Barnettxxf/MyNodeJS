var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodeParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('express/public'))


app.get('/index.htm', function (req, res) {
    res.sendFile(__dirname + '/' + 'index.post.htm');
})

app.post('/process_post', urlencodeParser, function (req, res) {
    resposne = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };
    console.log(resposne)
    res.end(JSON.stringify(resposne));
})

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('express demo3, address is http://%s:%s', host, port)
})