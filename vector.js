(function() {
    var vector = function() { };
    vector.VERSION = '0.1.0';

    vector.prototype.init = function(obj) {
        this._data = [];
        this._size = 0;
        this._type = 'vector';

        if (typeof obj === 'number') {
            // init with size
            this._data = Array.apply(null, new Array(obj)).map(Number.prototype.valueOf,0);
            this._size = obj;
        } else {
            // init with array
            this._data = obj;
            this._size = obj.length;
        }
    };

    vector.prototype.getSize = function() {
        return this._size;
    };

    vector.prototype.getData = function() {
        return this._data;
    };

    vector.prototype.plus = function(obj) {
        if (typeof obj._type !== 'undefined') {
            if (obj._type !== 'vector') {
                throw 'Not a Vector Object';
            }

            if (this._size !== obj._size) {
                throw 'Size not Match';
            }

            var i;
            for (i = 0; i < this._size; i++) {
                this._data[i] += obj._data[i];
            }
        } else {
            throw 'Not a Vector Object';
        }
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = vector;
        }
        exports.vector = vector;
    } else {
        root.vector = vector;
    }
}).call(this);