(function() {
    var vector = function() { };
    vector.VERSION = '0.1.0';

    vector.prototype.init = function(obj) {
        this._data = [];
        this._size = 0;
        this._type = 'vector';
        this._plus = function(a, b) { return a+b; };
        this._multiple = function(a, b) { return a*b; };
        this._one = 1;

        if (typeof obj === 'number') {
            // init with size
            this._data = Array.apply(null, new Array(obj)).map(Number.prototype.valueOf,0);
            this._size = obj;
        } else {
            // init with array
            this._data = obj;
            this._size = obj.length;
        }
        return this;
    };

    // toString
    vector.prototype.toString = function() {
        var i;
        var s = '[';
        for (i = 0; i < this._size; i++) {
            if (i !== 0) s += ',';
            s += this._data[i];
        }
        s += ']';
        return s;
    };

    // change the default plus method
    vector.prototype.setPlus = function(callback) {
        this._plus = callback;
    };

    // change the default multiple method
    vector.prototype.setMultiple = function(callback) {
        this._multiple = callback;
    };

    // change the default one 
    vector.prototype.setOne = function(o) {
        this._one = o;
    };

    // get vector length
    vector.prototype.getSize = function() {
        return this._size;
    };

    // get vector data as Array
    vector.prototype.getData = function() {
        return this._data;
    };

    // plus
    vector.prototype.plus = function(obj) {
        var self = this;

        if (typeof obj._type !== 'undefined') {
            if (obj._type !== 'vector') {
                throw new Error('Not a Vector Object');
            }

            if (this._size !== obj._size) {
                throw new Error('Size not Match');
            }

            var i;
            for (i = 0; i < this._size; i++) {
                this._data[i] = self._plus(this._data[i], obj._data[i]);
            }
        } else {
            throw new Error('Not a Vector Object');
        }
        return this;
    };

    // dot product
    vector.prototype.dot = function(obj) {
        var i;
        var self = this;
        if (typeof obj === 'number') {
            // dot number
            for (i = 0; i < this._size; i++) {
                this._data[i] = self._multiple(this._data[i], obj);
            }
        } else if (typeof obj._type !== 'undefined') {
            if (obj._type !== 'vector') {
                throw new Error('Dot Object Unrecognized');
            }
            // dot vector
            if (this._size !== obj._size) {
                throw new Error('Size not Match');
            }

            for (i = 0; i < this._size; i++) {
                this._data[i] = self._multiple(this._data[i], obj._data[i]);
            }
        } else {
            throw new Error('Dot Object Unrecognized');
        }
        return this;
    };

    // power
    vector.prototype.power = function(num) {
        var i;
        var self = this;
        for (i = 0; i < this._size; i++) {
            tmp = self._one;
            for (j = 0; j < num; j++) {
                tmp = this._multiple(tmp, this._data[i]);
            }
            this._data[i] = tmp;
        }
        return this;
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