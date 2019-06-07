var fetch = require('node-fetch');

function* gen() {
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio);
}


var g = gen();
var result = g.next();

result.value.then(function (data) {
    return data.json();
}).then(function (data) {
    g.next(data)
})

const fs = require('fs');


const readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    });
};


const generator = function* () {
    const f1 = yield readFile('/etc/fstab');
    const f2 = yield readFile('/etc/shells');

    console.log(f1.toString());
    console.log(f2.toString());
}

// const gg = generator();
// gg.next().value.then(data => {
//     gg.next(data).value.then(data => {
//         gg.next(data);
//     })
// })


function run(gen) {
    let g = gen();

    function next(data) {
        let result = g.next(data);
        if (result.done) return result.value;
        result.value.then(data => {
            next(data);
        })
    }

    next();
}

run(generator)


