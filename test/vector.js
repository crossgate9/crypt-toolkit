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

suite('Vector Plus Function', function() {
    test('Success Plus Vector', function() {
        var a = new Vector();
        var b = new Vector();
        a.init([1,2,3]);
        b.init([4,5,6]);
        assert.deepEqual([5,7,9], a.plus(b).getData());
    });

    test('Modify Plus Method', function() {
        var a = new Vector();
        var b = new Vector();
        a.init([1,2,3]);
        b.init([4,5,6]);
        a.setPlus(function(a, b) { return a^b;});
        assert.deepEqual([5, 7, 5], a.plus(b).getData());
    });

    test('Failed with different dimension', function() {
        var a = new Vector();
        var b = new Vector();
        a.init([1,2,3]);
        b.init([2,3,4,5]);
        (function() { a.plus(b); }).should.throw('Size not Match');
    });

    test('Failed with non-vector variable', function() {
        var a = new Vector();
        a.init([1,2,3]);
        (function() { a.plus('abc'); }).should.throw('Not a Vector Object');
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
        (function() { a.dot('abc'); }).should.throw('Dot Object Unrecognized');
    });

    test('Failed with Unrecognized Object II', function() {
        var a = new Vector();
        var b = { };
        a.init([1,2,3]);
        b._type = 'string';
        (function() { a.dot(b); }).should.throw('Dot Object Unrecognized');
    });

    test('Failed with different size', function() {
        var a = new Vector();
        var b = new Vector();
        a.init([1,2,3]);
        b.init([2,3,4,5]);
        (function() { a.dot(b); }).should.throw('Size not Match');
    });
});

suite('Vector Power Function', function() {
    test('Success', function() {
        var a = new Vector();
        a.init([1,2,3]);
        assert.deepEqual([1,8,27], a.power(3).getData());
    });
});

suite('toString', function() {
    test('Success', function() {
        var a = new Vector();
        a.init([1,2,3]);
        assert.equal('[1,2,3]', a.toString());
    });
});

suite('isVector', function() {
    test('True', function() {
        var a = new Vector();
        a.init([1,2,3]);
        assert.equal(true, Vector.isVector(a));
    });

    test('False I', function() {
        assert.equal(false, Vector.isVector(null));
        assert.equal(false, Vector.isVector('abc'));
        assert.equal(false, Vector.isVector(
            {
                '_class': 'vector',
                '_size': 1,
                '_data': 'a'
            }
        ));
    });

    test('False II', function() {
        var a = {
            '_class': 'vector',
            '_size': 3,
            '_data': [1,2,3,4]
        };
        (function() { Vector.isVector(a); }).should.throw('Size doesn\'t match');
    });
});

suite('toMatrix', function() {
    test('Row Vector', function() {
        var a = new Vector();
        a.init([1,2,3], a.TYPE.ROW);
        assert.deepEqual([[1,2,3]], a.toMatrix().getData());
    });

    test('Column Vector', function() {
        var a = new Vector();
        a.init([1,2,3], a.TYPE.COLUMN);
        assert.deepEqual([[1],[2],[3]], a.toMatrix().getData());
    });
});