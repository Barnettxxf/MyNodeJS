var buf = new Buffer(256);

var len = buf.write('I am coming.')

console.log('written: ' + len)
