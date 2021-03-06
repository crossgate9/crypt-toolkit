var utility = require('./utility'),
    Vector = require('./vector');
var _ = require('./lib/underscore');

(function() {
    var matrix = function() { };
    matrix.VERSION = '0.1.0';

    matrix.prototype.TYPE = {
        'BYSIZE': 0,
        'BYDATA': 1
    };

    matrix.prototype.getSize = function() {
        return this._size;
    };

    matrix.prototype.getData = function() {
        return this._data;
    };

    matrix.prototype.toString = function() {
        var res = '';
        var d = this.getData();
        var s = this.getSize();
        var i, j;
        res += '[';
        for (i = 0; i < s[0]; i++) {
            if (i !== 0) res += ',';
            res += '[';
            for (j = 0; j < s[1]; j++) {
                if (j !== 0) res += ',';
                res += d[i][j];
            }
            res += ']';
        }
        res += ']';
        return res;
    };

    matrix.prototype.getClass = function() {
        return this._class;
    };
    
    matrix.prototype.init = function(obj, type) {
        var i;

        type = type | this.TYPE.BYSIZE;

        this._data = [];
        this._size = [];
        this._class = 'matrix';

        if (utility.isArray(obj) === false) {
            throw new Error('Object Unrecognized');
        }

        if (_.values(this.TYPE).indexOf(type) === -1) {
            throw 'Init method not found';
        }

        if (type === this.TYPE.BYSIZE) {
            this._size = obj;
            this._data = [];
            for (i = 0; i < obj[0]; i++) {
                this._data[i] = Array.apply(null, new Array(obj[1])).map(Number.prototype.valueOf,0);
            }
        }

        if (type === this.TYPE.BYDATA) {
            this._size = utility.getArrayDimension(obj);
            // [TODO] deep copy
            this._data = obj;
        }

        return this;
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = matrix;
        }
        exports.matrix = matrix;
    } else {
        root.matrix = matrix;
    }

    matrix.isMatrix = function(obj) {
        if (obj === null || typeof obj === 'undefined' ||
            obj._class === null || typeof obj._class === 'undefined' ||
            obj._size === null || typeof obj._size === 'undefined' ||
            obj._data === null || typeof obj._data === 'undefined') {
            return false;
        }

        if (obj._class !== 'matrix') {
            return false;
        }

        var size;
        try {
            size = utility.getArrayDimension(obj._data);
        } catch (err) {
            return false;
        }

        console.log(size);
        console.log(obj._size);

        if (size[0] !== obj._size[0] || size[1] !== obj._size[1]) {
            throw new Error('Size doesn\'t match');
        }

        return true;
    };

    matrix.prototype.plus = function(obj) {
        if (matrix.isMatrix(obj) === false) {
            throw new Error('Object not a matrix');
        }

        var sizeA = this.getSize(),
            sizeB = obj.getSize();
        if (sizeA[0] !== sizeB[0] || sizeA[1] !== sizeB[1]) {
            throw new Error('Size not match');
        }

        var i, j;
        var dataB = obj.getData();
        for (i = 0; i < sizeA[0]; i++) {
            for (j = 0; j < sizeB[0]; j++) {
                this._data[i][j] += dataB[i][j];
            }
        }

        return this;
    };

    matrix.prototype.multiple = function(obj) {
        if (matrix.isMatrix(obj) === false) {
            if (Vector.isVector(obj) === false) {
                throw new Error('Object not a matrix');
            } else {
                return this.multiple(obj.toMatrix());
            }
        }

        var sizeA = this.getSize(),
            sizeB = obj.getSize();
        if (sizeA[1] !== sizeB[0]) {
            throw new Error('Size not match');
        }

        var tmp, i, j, k;
        var dataA = this.getData(),
            dataB = obj.getData();
        var res = [];

        for (i = 0; i < sizeA[0]; i++) {
            res[i] = [];
            for (j = 0; j < sizeB[1]; j++) {
                tmp = 0;
                for (k = 0; k < sizeA[1]; k++) {
                    tmp += dataA[i][k] * dataB[k][j];
                }
                res[i][j] = tmp;
            }
        }

        return this.init(res, this.TYPE.BYDATA);
    };
}).call(this);