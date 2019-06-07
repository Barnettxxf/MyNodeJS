var express = require('express');
var app = express();

app.get('/', function (req, res) {
    console.log('Homepage GET request')
    res.send('Hello GET');
})

app.post('/', function (req, res) {
    console.log('Homepage POST request');
    res.send('Hello POST');
})

app.delete('/del_user', function (req, res) {
    console.log('/del_user response DELETE request')
    res.send('delete page')
})

app.get('/list_user', function (req, res) {
    console.log('/list_user GET request')
    res.send('user list')
})

app.get('/ab*cd', function (req, res) {
    console.log('/ab*cd GET request')
    res.send('REG')
})


var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('express demo1, address is http://%s:%s', host, port)
})