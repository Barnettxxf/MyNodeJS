/*
const getJSON = function(url) {
    const promise = new Promise(function(resolve, reject) {
        const handler = function() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        };

        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json")
        client.send();
    })

    return promise;
}

getJSON("/posts.json")
    .then(function(json){
        console.log('Content: ' + json);
    })
    .catch(function(err){
        console.err('err: ' + err)
    })

 */


const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000);
})

const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000);
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))

// resolve 或者 reject 应该放在promise最后，不应该还有东西了；
new Promise((resolve, reject) => {
    resolve(1);
    console.log(2);
}).then(r => console.log(r))