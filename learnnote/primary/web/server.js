var http = require('http');
var fs = require('fs');
var url = require('url')


http.createServer(function (request, response) {
    var pathName = url.parse(request.url).pathname;
    console.log('Request from ' + pathName + ' received.')

    console.log('pathName substr: ', pathName.substr(1))
    fs.readFile(pathName.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data.toString());
        }

        response.end();
    })
}).listen(8081);

console.log('Server running at http://localhost:8081/web/index.html')

// http://localhost:8081/web/index.html