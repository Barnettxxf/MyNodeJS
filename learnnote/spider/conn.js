const mysql = require('mysql');


var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    connectionLimit: 10,
    charset : 'utf8mb4'
});

pool.connectionLimit = 100;
pool.waitForConnections = true;
pool.queueLimit = 0;


module.exports = {
    getConnection: function() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(conn);
                }
    
            })
        })
    },
    pool: pool
}

