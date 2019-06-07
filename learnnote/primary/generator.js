function* helloworldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloworldGenerator();

console.log(hw.next())
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())



function* f() {
    for (let i = 0; true; i++) {
        let reset = yield i;
        if (reset) { i = -1 };
    }
}


var g = f();

console.log(g.next())
console.log(g.next())
console.log(g.next(true))


function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}

var a = foo(5);
console.log(a.next())
console.log(a.next())
console.log(a.next())


var b = foo(5);
console.log(b.next())
console.log(b.next(12))

var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
console.log(b.next(13))


const thunkify = require('thunkify');
const fs = require('fs');

const read = thunkify(fs.readFile);
read('package.json')(function(err, str) {
    console.log(str)
})