const cheerio = require('cheerio');
const superagent = require('superagent');
const { pool, getConnection } = require('./conn');


class toutiaoSpider {
    constructor(urls) {
        this.urls = urls;
        this.insertIds = [];
    };

    async getConn() {
        return await getConnection();
    }

    async getResponse(url) {
        return await superagent
            .get(url)
            .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36')
    }

    async saveRow(row) {
        const connection = await this.getConn();
        return new Promise((resolve, reject) => {
            connection.query('insert into test_02(text) values (?)', [row.title.toString()], (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log(res.insertId, row.title);
                resolve(res.insertId);
            })
        }).then((data) => {
            connection.release();
            return data;
        })
    }

    getRows(response) {
        const data = JSON.parse(response.text);
        return data.data;
    }

    async parse() {
        let responsePromise = this.urls.map(url => this.getResponse(url))
        let responseList = await Promise.all(responsePromise);
        for (let response of responseList) {
            const rows = this.getRows(response);
            let promises = rows.map(row => this.saveRow(row));
            let insertIds = await Promise.all(promises);
            this.insertIds.push(...insertIds);
        }
    }

    async close() {
        console.log('Close connection pool.')
        await pool.end();
    }
}





(async function () {
    const urls = []
    for (let i = 0; i < 10; i++) {
        urls.push(`https://landing.toutiao.com/api/pc/hot_gallery/?widen=${i + 1}`)
    }
    const start = new Date()
    console.log(start.toDateString(), start.toTimeString())
    const spider = new toutiaoSpider(urls);
    await spider.parse();
    await spider.close();
    const end = new Date() - start;
    console.log(end.toString())
})();