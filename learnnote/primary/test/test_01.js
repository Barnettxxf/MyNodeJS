'use strict';


const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "172.16.24.45",
    user: "dev",
    password: "8be9a6f1-1355-4d91-8ab9-d2d8ac080820",
    port: 3307,
    database: 'coles'
});


connection.query('select * from product order by snapshot_time desc limit 1', function (err, results, fields) {
    if (err) throw err;

    const { Browser } = require('../../soda-browser/lib/browser');
    const redis = require("redis");
    const bluebird = require('bluebird');
    bluebird.promisifyAll(redis.RedisClient.prototype);
    bluebird.promisifyAll(redis.Multi.prototype);

    const allow_outkey = ["product", "product_list"];
    const redis_keymapping = {
        product: 'sites.coles.cookies.product',
        product_list: 'sites.coles.cookies.product_list'
    };

    const outkey_mapping = {
        product: "https://shop.coles.com.au/",
        product_list: JSON.parse(JSON.stringify(results))[0].url,
    };

    const out_key = process.argv[2];

    if (allow_outkey.indexOf(out_key) < 0) {
        throw Error('Input must be product or product_list')
    }
    const DEBUG = true;
    const selectors = {
        m: {
            target: '.a-section',  // class
            username: '#ap_email',  // id
            password: '#ap_password',
            remember: "input[name='rememberMe']",  // input标签 属性name='rememberMe'
            submit: '.a-button-input',
            second: '#auth-mfa-form',  // 两步认证
            second_yzm: '#auth-mfa-otpcode',  // 两步认证:验证码
            not_next_yzm: '#auth-mfa-remember-device',  // 两步认证:下次不要验证码
        },

        s: {
            target: '.catalog-container.i90-section',  // 如果class里面有空格，用.代替
        },
        update: {
            target: '#ap_password',  // 更新cookie
            flag: '#dashboardCommonTitle',  // 更新cookie
        }

    };

    // 把cookie放到38机器上
    const redisClient1 = redis.createClient({
        host: '172.16.24.38',
        db: 166,
    });

    // 本地测试
    const redisClient2 = redis.createClient({
        host: '127.0.0.1',
        db: 1,
    });

    // exit on any redis error
    redisClient1.on('error', (error) => {
        console.error(error);
        process.exit(0);
    });

    // catch unknown error
    process.on('unhandledRejection', function (reason, p) {
        console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
        process.exit(0);
    });

    async function saveCookie(key_name, value) {
        let val = value || [];
        console.log('on--savecookie---', val.length);
        if (val.length) {
            let data = {
                time: new Date().toLocaleString(),
                value: value,
            };
            console.log(data.time, data);
            await redisClient1.setAsync(key_name, JSON.stringify(data))
        } else {
            throw new Error('NOT_LOGIN_COOKIE');
        }
    }

    async function main(url, key_name) {
        const browser = await Browser.create({
            // proxyServer: context.proxy,
            image: false,
            headless: !DEBUG,
            executablePath: DEBUG ? '../../soda-browser/Chromium-puppeteer-1.6.2.app/Contents/MacOS/Chromium' : 'google-chrome-unstable',
            platform: 'mac',
        });

        const page = browser.page;

        // const _cookies = await redisClient2.getAsync(key_name);
        // const cookies = JSON.parse(_cookies)["value"];
        // for (let cookie of cookies) {
        // await page.setCookie(cookie);
        // }

        try {
            // await page.emulate(DEVICE);
            console.log(new Date().toLocaleString(), 'goto login page');
            await page.goto(url, 30000);
            await Browser.sleep(2000);
            await page.cookies().then(res => console.log(res));
            await saveCookie(key_name, await page.cookies());
            console.log('saveCookie~~~');

            await Browser.sleep(10000);
            browser.close();
            // console.log('>>>cookie', page.cookies());
        } catch (e) {
            console.log(e);
            browser.close();
            throw e;
        }
    }


    (async () => {
        try {
            console.log('>>>', out_key);
            await main(out_key, redis_keymapping[out_key]);
        } catch (e) {
            console.log('update--cookie--fail-->', e);
            await Browser.sleep(10000);
        }

    })().catch(error => {
        console.log(error);
        process.exit();
    });
});

connection.end();