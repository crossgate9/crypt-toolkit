var utility = require('./utility');
var _ = require('./lib/underscore');

(function() {
    var matrix = function() { };
    matrix.VERSION = '0.1.0';

    matrix.prototype.TYPE = {
        'BYSIZE': 0,
        'BYDATA': 1
    };
    
    matrix.prototype.init = function(obj, type) {
        var i;

        type = type | this.TYPE.BYSIZE;

        this._data = [];
        this._size = [];
        this._type = 'matrix';

        if (utility.isArray(obj) === false) {
            throw 'Object Unrecognized';
        }

        if (_.values(this.prototype.TYPE).indexOf(type) === -1) {
            throw 'Init method not found';
        }

        if (type === this.prototype.TYPE.BYSIZE) {
            this._size = obj;
            this._data = [];
            for (i = 0; i < obj[0]; i++) {
                this._data[i] = Array.apply(null, new Array(obj[1])).map(Number.prototype.valueOf,0);
            }
        }

        if (type === this.prototype.TYPE.BYDATA) {
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
}).call(this);