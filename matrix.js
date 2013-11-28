var utility = require('./utility');
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
    
    matrix.prototype.init = function(obj, type) {
        var i;

        type = type | this.TYPE.BYSIZE;

        this._data = [];
        this._size = [];
        this._type = 'matrix';

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
            obj._type === null || typeof obj._type === 'undefined' ||
            obj._size === null || typeof obj._size === 'undefined' ||
            obj._data === null || typeof obj._data === 'undefined') {
            return false;
        }

        if (obj._type !== 'matrix') {
            return false;
        }

        var size;
        try {
            size = utility.getArrayDimension(obj._data);
        } catch (err) {
            return false;
        }

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
}).call(this);