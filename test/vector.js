var assert = require('assert');
var Vector = require('../vector');

suite('Vector Initialization', function() {
    test('Success create vector object with size', function() {
        var a = new Vector();
        a.init(10);
        assert.equal(10, a.getSize());
        assert.deepEqual([0,0,0,0,0,0,0,0,0,0], a.getData());
    });

    test('Success create vector object with array', function() {
        var a = new Vector();
        a.init([1,2,3,4,5,6]);
        assert.equal(6, a.getSize());
        assert.deepEqual([1,2,3,4,5,6], a.getData());
    });
});

suite('Vector Add Function', function() {
    test('Success Add Vector', function() {
        var a = new Vector();
        var b = new Vector();
        a.init([1,2,3]);
        b.init([4,5,6]);
        a.plus(b);
        assert.deepEqual([5,7,9], a.getData());
    });

    test('Failed with different dimension', function() {
        var a = new Vector();
        var b = new Vector();
        a.init([1,2,3]);
        b.init([2,3,4,5]);
        try {
            a.plus(b);
        } catch (err) {
            assert('Size not Match', err);
        }
    });

    test('Failed with non-vector variable', function() {
        var a = new Vector();
        a.init([1,2,3]);
        try {
            a.plus('abc');
        } catch (err) {
            assert('Not a Vector Object', err);
        }
    });
});

suite('Vector Dot Function', function() {
    test('Success Dot Vector with Number', function() {
        var a = new Vector();
        a.init([1,2,3]);
        a.dot(3);
        assert.deepEqual([3,6,9], a.getData());
    });

    test('Success Dot Vector with Vector', function() {
        var a = new Vector();
        var b = new Vector();
        a.init([1,2,3]);
        b.init([1,2,3]);
        a.dot(b);
        assert.deepEqual([1,4,9], a.getData());
    });

    test('Failed with Unrecognized Object I', function() {
        var a = new Vector();
        a.init([1,2,3]);
        try {
            a.dot('abc');
        } catch (err) {
            assert('Dot Object Unrecognized', err);
        }
    });

    test('Failed with Unrecognized Object II', function() {
        var a = new Vector();
        var b = { };
        a.init([1,2,3]);
        b._type = 'string';
        try {
            a.dot(b);
        } catch (err) {
            assert('Dot Object Unrecognized', err);
        }
    });

    test('Failed with different size', function() {
        var a = new Vector();
        var b = new Vector();
        a.init([1,2,3]);
        b.init([2,3,4,5]);
        try {
            a.dot(b);
        } catch (err) {
            assert('Size not Match', err);
        }
    });
});