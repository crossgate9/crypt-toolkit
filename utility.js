exports.permutation = function(input, m) {

    if (m > input.length) {
        throw 'Number Exceed the Array Size';
    }

    var permArr = [],
        used = [];

    var recursive = function(input, m, last) {
        var i, d;

        for (i = last; i < input.length; i++) {
            d = input.splice(i, 1)[0];
            used.push(d);
            if (m === 1) {
                permArr.push(used.slice());
            } else {
                recursive(input, m-1, i);
            }
            input.splice(i, 0, d);
            used.pop();
        }
    };

    recursive(input, m, 0);

    return permArr;
};

exports.xor = function(a, b) {
    return a ^ b;
};

exports.hex = function(a) {
    var c = {
        0: '0', 1: '1', 2: '2', 3: '3',
        4: '4', 5: '5', 6: '6', 7: '7',
        8: '8', 9: '9', 10: 'a', 11: 'b',
        12: 'c', 13: 'd', 14: 'e', 15: 'f',
    };
    return c[a];
};