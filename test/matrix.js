var Matrix = require('../matrix'),
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