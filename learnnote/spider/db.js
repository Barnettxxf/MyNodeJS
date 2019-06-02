const mysql = require('mysql');


var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    connectionLimit: 10
});

pool.getConnection(function(err, conn) {
    if (err) throw err;
    conn.query('insert ignore test_01(`id`, text) values (1, "hello"), (3, "worlddddd")', function(err, res) {
        if (err) throw err;
        return console.log(res)
    });
    conn.release();

    pool.end();
});

