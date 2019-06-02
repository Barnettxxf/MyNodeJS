const request = require('request');
const cheerio = require('cheerio');

// request(
//     'http://nodejs.org', function(error, response, body) {
//         if (!error) {
//             console.log(body)
//         }
//     }
// )


request({
    url: 'http://cnodejs.org/',
    method: 'GET',
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    }
}, function(err, rsp, body) {
    if (!err) {
        console.log(body);
    }
})