var buf = new Buffer(26);

for (var i = 0; i < 26; i++) {
    buf[i] = 97 + i;
}

console.log(buf.toString())
console.log(buf.toString('utf8',0, 5))
console.log(buf.toJSON())