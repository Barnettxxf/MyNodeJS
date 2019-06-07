'use strict';


let main = async () => {
    let mysql = require('async-mysql'),
        conn,
        rows;

    conn = mysql.createConnection({
        host: "172.16.24.45",
        user: "dev",
        password: "8be9a6f1-1355-4d91-8ab9-d2d8ac080820",
        port: 3307,
        database: 'coles'
    });

    rows = await conn.query('select * from product order by snapshot_time desc limit 1');

    console.log(rows)
    await conn.end();
    return JSON.parse(JSON.stringify(rows));

};

main();

