var express = require('express');
var app = express();
var fs = require('fs');


var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './express/public/tmp/'}).array('image'));

app.get('/index.htm', function (req, res) {
    res.sendFile(__dirname + '/' + 'index.file.htm');
})

app.post('/file_upload', function (req, res) {

    console.log(req.files[0]);  // 上传的文件信息
 
    var des_file = __dirname + "/public/img/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
         fs.writeFile(des_file, data, function (err) {
          if( err ){
               console.log( err );
          }else{
                response = {
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
               };
           }
           console.log( response );
           res.end( JSON.stringify( response ) );
        });
    });
 })

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('express demo, address is http://%s:%s', host, port)
})