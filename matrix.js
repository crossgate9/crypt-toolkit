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
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = matrix;
        }
        exports.matrix = matrix;
    } else {
        root.matrix = matrix;
    }

    matrix.prototype.isMatrix = function(obj) {
        if (obj._type === null || typeof obj._type === 'undefined' ||
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

        if (size[0] !== this._size[0] || size[1] !== this._size[1]) {
            throw new Error('Size doesn\'t match');
        }

        return true;
    };
}).call(this);