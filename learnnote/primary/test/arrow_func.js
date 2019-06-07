var two_params = (x, y) => x * x + x * y;
var no_params = () => 3.14;
var many_params = (x, y, ...rest) => {
    var i, sum = x + y;
    for (i=0; i<rest.length;i++) {
        sum += rest[i];
    }
    return sum
};
var one_params = x => ({foo: x});

console.log(two_params(1, 2));
console.log('============================');
console.log(no_params());
console.log('============================');
console.log(many_params(1, 2, 3, 4, 5, 6, 7, 8));
console.log('============================');
console.log(one_params(1))
