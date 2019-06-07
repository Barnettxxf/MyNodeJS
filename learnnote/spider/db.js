const db = require('./conn');


function query(conn) {
    return new Promise((resolve, reject) => {
        conn.query('select * from test_01', function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    })
}

let test = async function () {
    let conn = await db.getConnection();
    let data = await new Promise((resolve, reject) => {
        conn.query('select * from test_01', function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    })

    db.pool.end();
    return data
}

test().then(data => {
    data.forEach(element => {
        console.log(element.id, element.text)
    });
});


async function hello() {
    return 'hello world';
}

hello().then(data => console.log(data));



class Sleep {
    constructor(timeout) {
        this.timeout = timeout
    }

    then(resolve, reject) {
        const startTime = Date.now();
        setTimeout(() => resolve(Date.now() - startTime), this.timeout);
    }
}

(async () => {
    const actualTime = await new Sleep(1000);
    console.log(actualTime);
})();

