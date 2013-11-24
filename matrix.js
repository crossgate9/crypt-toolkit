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
            this._data = Array.apply(null, new Array(obj)).map(
                
            );
        }

        if (type === this.prototype.TYPE.BYDATA) {

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