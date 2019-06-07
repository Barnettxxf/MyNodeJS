const arr = [1, 4, -5, NaN, 10, 25, NaN]
const arr_01 = [1, 4, -5, 10, 25]

console.log(arr.find(x => x < 0))
console.log(arr.find(x => x > 10))

console.log(arr.findIndex((value, index, arr) => {
    return value < 0;
}))


let person = {
    name: 'John',
    age: 20,
}

function f(v) {
    return v > this.age;
}

console.log(arr.find(f, person))

console.log(arr.findIndex(x => Object.is(NaN, x)))

console.log(...arr)

console.log(Math.max(...arr_01))
console.log(Math.min(...arr_01))


const a1 = [1, 2];
const a2 = [...a1];
console.log(a1 === a2)


const a3 = [...a1, ...a2]
console.log(a3[0] === a1[0])


console.log([...'abcd'].reverse().join(''))


const arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3,
}

console.log(Array.from(arrayLike))


let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]);
let arr02 = [...map.keys()];
console.log(arr02)
console.log([...map.values()])
console.log(map)

console.log([1, 2, 4].map(x => x ** 2))

console.log(Array.from({ length: 10 }, () => 'jack'))

console.log(Array.of(1, 2, 3, 4))

const arr_copy_with_in = [1, 2, 4, 5, 6, 7]
console.log(arr_copy_with_in.copyWithin(0, 3))
console.log(arr_copy_with_in)


console.log(new Array(10).fill(7))



console.log(['a', 'b', 'c'].fill(7, 1, 2))


for (let index of ['a', 'b'].keys()) {
    console.log('index', index)
}

for (let elem of ['a', 'b'].values()) {
    console.log('values', elem)
}

for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem)
}



console.log(['a', 'b', 'c'].includes('b'))


console.log(new Map([[1, 2], [2, 3]]).has(1))


console.log([1, 2, [3, 4]].flat())