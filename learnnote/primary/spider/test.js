var superagent = require('superagent-charset')(require('superagent'));
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var main_url = 'http://www.mzitu.com/';
var meiziURL = 'http://www.mzitu.com/71235';


function catch_list(url, callback) {
    superagent
        .get(url)
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36')
        .set('Host', 'www.mzitu.com')
        .end(function (err, sres) {
            if (err) {
                console.error(err)
            }
            var items = []
            var $ = cheerio.load(sres.text)
            $('#menu-nav').find('li').each(function (idx, element) {
                $element = $(element)
                var url = $element.find('a').attr('href')
                var title = $element.find('a').attr('title')
                console.log(title, url)
                items.push({
                    title: title,
                    url: url
                })
            })
            callback(items)
            // console.log(sres.text)
        })
}


function write_to_file_in_JSON(items, dir, filename) {
    console.log('完成' + items.length + '个抓取');
    var fs = require('fs');
    var dirname = dir + filename + '.json';
    var path = require('path');
    fs.writeFile(dirname, JSON.stringify(items));
}

// for (var i = 1; i <= 127; i++) {
//     var success = 1
//     var data = []
//     catch_list(main_url + 'page/' + String(i), function (items) {
//         console.log(items.length)
//         data = data.concat(items)
//         success++
//         if (success == 2) write_to_file_in_JSON(data, './', '妹子图')
//     })
// }

catch_list(meiziURL, console.log);