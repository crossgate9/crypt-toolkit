var Matrix = require('../matrix'),
    Vector = require('../vector'),
    assert = require('assert'),
    should = require('should');

suite('Matrix Initialization', function() {
    test('Success Create Matrix with size', function() {
        var a = new Matrix();
        a.init([2, 3], a.TYPE.BYSIZE);
        assert.deepEqual([2, 3], a.getSize());
        assert.deepEqual([[0, 0, 0],[0, 0, 0]], a.getData());
    });

    test('Success Create Matrix with data', function() {
        var a = new Matrix();
        a.init([[1,2],[2,3]], a.TYPE.BYDATA);
        assert.deepEqual([2, 2], a.getSize());
        assert.deepEqual([[1,2],[2,3]], a.getData());
    });

    test('Failed I', function() {
        var a = new Matrix();
        (function () { a.init('abc', a.TYPE.BYSIZE); }).should.throw('Object Unrecognized');
    });
});

suite('Matrix Get Property', function() {
    test('getSize I', function() {
        var a = new Matrix();
        a.init([2, 3], a.TYPE.BYSIZE);
        assert.deepEqual([2, 3], a.getSize());
    });

    test('getSize II', function() {
        var a = new Matrix();
        a.init([[1,2],[2,3]], a.TYPE.BYDATA);
        assert.deepEqual([2, 2], a.getSize());
    });

    test('getData I', function() {
        var a = new Matrix();
        a.init([2, 3], a.TYPE.BYSIZE);
        assert.deepEqual([[0, 0, 0],[0, 0, 0]], a.getData());
    });

    test('getData II', function() {
       var a = new Matrix();
        a.init([[1,2],[2,3]], a.TYPE.BYDATA);
        assert.deepEqual([[1,2],[2,3]], a.getData());
    });
});

suite('isMatrix', function() {
    test('True I', function() {
        var a = new Matrix();
        a.init([2, 3], a.TYPE.BYSIZE);
        assert.equal(true, Matrix.isMatrix(a));
    });

    test('True II', function() {
        var a = new Matrix();
        a.init([[1,2],[3,4]], a.TYPE.BYDATA);
        assert.equal(true, Matrix.isMatrix(a));
    });

    test('False I', function() {
        assert.equal(false, Matrix.isMatrix(null));
    });

    test('False II', function() {
        var a = new Vector();
        assert.equal(false, Matrix.isMatrix(a));
    });

    test('False III', function() {
        var a = {
            _class: 'matrix',
            _size: [2, 2],
            _data: 'abc'
        };
        assert.equal(false, Matrix.isMatrix(a));
    });

    test('False IV', function() {
        var a = {
            _class: 'matrix',
            _size: [2, 2],
            _data: [[1,2,3],[2,3,4]]
        };
        console.log(a);
        (function() { Matrix.isMatrix(a); }).should.throw('Size doesn\'t match');
    });
});

suite('Plus', function() {
    test('Success', function() {
        var a = new Matrix(),
            b = new Matrix();
        a.init([[1,2],[3,4]], a.TYPE.BYDATA);
        b.init([[1,2],[3,4]], b.TYPE.BYDATA).plus(a);
        assert.deepEqual([[2,4],[6,8]], b.getData());
    });

    test('Fail I', function() {
        var a = new Matrix();
        a.init([[1,2],[3,4]], a.TYPE.BYDATA);
        (function() { a.plus('abc'); }).should.throw('Object not a matrix');
    });

    test('Fail II', function() {
        var a = new Matrix(),
            b = new Matrix();
        a.init([[1,2],[3,4]], a.TYPE.BYDATA);
        b.init([[1,2,3],[4,5,6]], b.TYPE.BYDATA);
        (function() { a.plus(b); }).should.throw('Size not match');
    });
});

suite('Multiple', function() {
    test('Success I', function() {
        var a = new Matrix(),
            b = new Matrix();
        a.init([[1,2],[3,4]], a.TYPE.BYDATA);
        b.init([[1,2],[3,4]], b.TYPE.BYDATA);
        assert.deepEqual([[7, 10], [15, 22]], b.multiple(a).getData());
    });

    test('Success II', function() {
        var a = new Matrix(),
            b = new Vector();

        // column vector
        a.init([[1,2],[3,4]], a.TYPE.BYDATA);
        b.init([1,2], b.TYPE.COLUMN);
        assert.deepEqual([[5],[11]], a.multiple(b).getData());

        // row vector
        a.init([[1,2],[3,4]], a.TYPE.BYDATA);
        b.init([1,2], b.TYPE.ROW);
        assert.deepEqual([[7,10]],b.toMatrix().multiple(a).getData());
    });

    test('Fail I', function() {
        var a = new Matrix();
        a.init([[1,2],[3,4]], a.TYPE.BYDATA);
        (function() { a.multiple('abc'); }).should.throw('Object not a matrix');
    });

    test('Fail II', function() {
        var a = new Matrix(),
            b = new Matrix();
        a.init([[1,2],[3,4]], a.TYPE.BYDATA);
        b.init([[1,2,3],[4,5,6], [7, 8, 9]], b.TYPE.BYDATA);
        (function() { a.multiple(b); }).should.throw('Size not match');
    });
});

suite('toString', function() {
    test('Success', function() {
        var a = new Matrix();
        a.init([[1,2],[3,4]], a.TYPE.BYDATA);
        assert.equal('[[1,2],[3,4]]', a.toString());
    });
});