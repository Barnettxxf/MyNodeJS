const cheerio = require('cheerio');
const superagent = require('superagent');
const { pool, getConnection } = require('./conn');


class toutiaoSpider {
    constructor(urls) {
        this.urls = urls;
        this.connection = await getConnection();
        this.insertIds = [];
    };

    async getResponse(url) {
        this.response = await superagent
            .get(url)
            .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36')
    }

    async saveRow(row) {
        console.log(row.title)
        return new Promise((resolve, reject) => {
            this.connection.query('insert into test_02(text) values (?)', [row.title.toString()], (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(res.insertId);
            })
        })
    }

    async parse() {
        let responsePromise = this.urls.map(url => getResponse(url))
        let responseList = await Promise.all(responsePromise);
        for (let response of responseList) {
            const rows = parse(response);
            let promises = rows.map(row => saveRow(row));
            let insertIds = await Promise.all(promises);
            this.insertIds.concat(...insertIds);
        }
    }

    async close() {
        console.log(this.insertIds);
        pool.end();
    }
}

async function getResponse(url) {
    return await superagent
        .get(url)
        .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36')
}


function parse(response) {
    const json_data = JSON.parse(response.text);
    return json_data.data;
}

async function saveRow(row) {
    const connection = await getConnection();
    console.log(row.title)
    return new Promise((resolve, reject) => {
        connection.query('insert into test_02(text) values (?)', [row.title.toString()], (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            resolve(res.insertId);
        })
    })
}

(async function () {
    let response = await getResponse('https://landing.toutiao.com/api/pc/hot_gallery/?widen=1');
    const rows = parse(response);

    let promises = rows.map(row => saveRow(row));
    let insertIds = await Promise.all(promises);
    console.log(insertIds)
    pool.end();
})();