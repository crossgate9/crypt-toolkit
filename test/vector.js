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
   
});