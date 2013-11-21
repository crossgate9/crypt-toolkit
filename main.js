var _ = require('./underscore');
var utility = require('./utility');

var b = 11,
    c = 12,
    d = 13,
    e = 14;

var data = [
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1],
    [0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0 ,1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 1, 0 ,1, 1, 0, 1, 1],
    [1, 1, 0 ,1, 1, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 0 ,1, 1, 0, 0, 0, 1, 1, 0, 0],
    [1, 1, 0 ,1, 1, 1, 0, 0, 1, 0, 0, 0]
];

var c;

var category = function(v) {
    var w = v[0] * 8 + v[1] * 4 + v[2] * 2 + v[3],
        y = v[4] * 8 + v[5] * 4 + v[6] * 2 + v[7],
        z = v[8] * 8 + v[9] * 4 + v[10] * 2 + v[11];

    var yc = (y === 6 || y === 11),
        zc = (z === 6 || z === 11);

    if (yc === true && zc === true) {
        c[0] ++;
    } else if (yc === false && zc === false) {
        c[2] ++;
    } else {
        c[1] ++;
    }
};

var a;
var sub = function(data, x) {
    var i, j;
    if (x < 0) {
        var v = Array.apply(null, new Array(12)).map(Number.prototype.valueOf,0);
        for (i = 0; i < data.length; i++) {
            if (a[i] === 1) {
                for (j = 0; j < 12; j++) {
                    v[j] = utility.xor(v[j], data[i][j]);
                }
            }
        }
        category(v);
    } else {
        for (i = 0; i < 2; i++) {
            a[x] = i;
            sub(data, x-1);
        }
    }
};

var output = function(d, c) {
    var dd = [];
    var i, j;
    for (i = 0; i < d.length; i++) {
        dd[i] = [];
        dd[i][0] = utility.hex(d[i][0] * 8 + d[i][1] * 4 + d[i][2] * 2 + d[i][3]);
        dd[i][1] = utility.hex(d[i][4] * 8 + d[i][5] * 4 + d[i][6] * 2 + d[i][7]);
        dd[i][2] = utility.hex(d[i][8] * 8 + d[i][9] * 4 + d[i][10] * 2 + d[i][11]);
    }
    for (i = 0; i < d.length; i++) {
        process.stdout.write('[');
        for (j = 0; j < 3 ; j++) {
            process.stdout.write(dd[i][j]);
            if (j < 2) process.stdout.write(',');
        }
        process.stdout.write(']');
    }
    process.stdout.write(' - (' + c[0] + ',' + c[1] + ',' + c[2] + ')');
    process.stdout.write('\n');
};

var perm = utility.permutation(data, 2);
var i;
for (i = 0; i < perm.length; i++) {
    var d = perm[i];
    d = _.difference(data, d);
    a = [];
    c = [0, 0, 0];
    sub(d, d.length - 1);
    output(d, c);
}