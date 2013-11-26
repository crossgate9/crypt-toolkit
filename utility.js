(function() {
    var utility = function() { };
    utility.VERSION = '0.1.0';

    utility.permutation = function(input, m) {

        if (m > input.length) {
            throw new Error('Number Exceed the Array Size');
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

    utility.xor = function(a, b) {
        return a ^ b;
    };

    utility.hex = function(a) {
        var c = {
            0: '0', 1: '1', 2: '2', 3: '3',
            4: '4', 5: '5', 6: '6', 7: '7',
            8: '8', 9: '9', 10: 'a', 11: 'b',
            12: 'c', 13: 'd', 14: 'e', 15: 'f',
        };
        return c[a];
    };

    utility.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    utility.isNumber = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Number]';
    };

    utility.getArrayDimension = function(obj) {
        var row, column = -1;
        var i, j;

        if (utility.isArray(obj) === false) {
            throw new Error('Object is not an array');
        } else {
            row = obj.length;
            for (i = 0; i < row; i++) {
                if (utility.isArray(obj[i]) === false) {
                    throw new Error('Object is not an array');
                } else {
                    if (column === -1) column = obj[i].length;
                    if (obj[i].length !== column) {
                        throw new Error('Row count doesn\'t match');
                    }
                    for (j = 0; j < column; j++) {
                        if (utility.isNumber(obj[i][j]) === false) {
                            throw new Error('Entity is not a Number');
                        }
                    }
                }
            }
        }

        return [row, column];
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = utility;
        }
        exports.utility = utility;
    } else {
        root.utility = utility;
    }
}).call(this);