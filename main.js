var _ = require('./lib/underscore');
var utility = require('./utility');
var Vector = require('./vector');

var b = 11,
    c = 12,
    d = 13,
    e = 14;

var data = [
    new Vector().init([0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0]),
    new Vector().init([0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1]),
    new Vector().init([0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0]),
    new Vector().init([0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0]),
    new Vector().init([0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1]),
    new Vector().init([0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1]),
    new Vector().init([1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0 ,1]),
    new Vector().init([1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1]),
    new Vector().init([1, 0, 0, 0, 1, 1, 0 ,1, 1, 0, 1, 1]),
    new Vector().init([1, 1, 0 ,1, 1, 0, 0, 0, 1, 0, 0, 0]),
    new Vector().init([1, 1, 0 ,1, 1, 0, 0, 0, 1, 1, 0, 0]),
    new Vector().init([1, 1, 0 ,1, 1, 1, 0, 0, 1, 0, 0, 0])
];

var c;
var used;

var category = function(v) {
    var d = v.getData();
    var w = d[0] * 8 + d[1] * 4 + d[2] * 2 + d[3],
        y = d[4] * 8 + d[5] * 4 + d[6] * 2 + d[7],
        z = d[8] * 8 + d[9] * 4 + d[10] * 2 + d[11];
    var vv = w.toString() + ',' + y.toString() + ',' + z.toString();
    if (_.indexOf(used, vv) !== -1) {
        return;
    }
    used.push(vv);

    var yc, zc;
    var v1, v2;

    switch (w) {
        case 2:
            v1 = 6; v2 = 11;
            if (y === 0 || y === 1 || y === 7 || y === 10 || y === 12 || y === 13) return;
            if (z === 0 || z === 1 || z === 7 || z === 10 || z === 12 || z === 13) return;
            break;
        case 4:
            v1 = 9; v2 = 14;
            if (y === 0 || y === 1 || y === 6 || y === 7 || y === 8 || y === 15) return;
            if (z === 0 || z === 1 || z === 6 || z === 7 || z === 8 || z === 15) return;
            break;
        case 6:
            v1 = 1; v2 = 2;
            if (y === 3 || y === 4 || y === 5 || y === 6 || y === 7 || y === 0) return;
            if (z === 3 || z === 4 || z === 5 || z === 6 || z === 7 || z === 0) return;
            break;
        case 8:
            v1 = 11; v2 = 13;
            if (y === 0 || y === 2 || y === 4 || y === 6 || y === 9 || y === 15) return;
            if (z === 0 || z === 2 || z === 4 || z === 6 || z === 9 || z === 15) return;
            break;
        case 13:
            v1 = 8; v2 = 12;
            if (y === 0 || y === 1 || y === 4 || y === 5 || y === 9 || y === 13) return;
            if (z === 0 || z === 1 || z === 4 || z === 5 || z === 9 || z === 13) return;
            break;
        case 14:
            v1 = 4; v2 = 12;
            if (y === 0 || y === 2 || y === 6 || y === 8 || y === 10 || y === 14) return;
            if (z === 0 || z === 2 || z === 6 || z === 8 || z === 10 || z === 14) return;
            break;
        default:
            return;
    }

    yc = (y === v1 || y === v2);
    zc = (z === v1 || z === v2);

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
                    v[j] = utility.xor(v[j], data[i].getData()[j]);
                }
            }
        }
        category(new Vector().init(v));
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
        var data = d[i].getData();
        dd[i] = [];
        dd[i][0] = utility.hex(data[0] * 8 + data[1] * 4 + data[2] * 2 + data[3]);
        dd[i][1] = utility.hex(data[4] * 8 + data[5] * 4 + data[6] * 2 + data[7]);
        dd[i][2] = utility.hex(data[8] * 8 + data[9] * 4 + data[10] * 2 + data[11]);
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
    process.stdout.write(' - ' + (c[0]+c[1]+c[2]));
    process.stdout.write('\n');
};

var perm = utility.permutation(data, 2);
// perm = [[]];
var i;
for (i = 0; i < perm.length; i++) {
    var d = perm[i];
    d = _.difference(data, d);
    a = [];
    c = [0, 0, 0];
    used = [];
    sub(d, d.length - 1);
    output(d, c);
}