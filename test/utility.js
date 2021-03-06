var utility = require('../utility'),
    assert = require('assert'),
    // expect = require('chai').expect,
    should = require('should');
    

suite('Utility Basic Function', function() {
    test('permutation', function() {
        var a = [1,2,3];
        assert.deepEqual([], utility.permutation(a,0));
        assert.deepEqual([[1],[2],[3]], utility.permutation(a, 1));
        assert.deepEqual([[1,2],[1,3],[2,3]], utility.permutation(a, 2));
        assert.deepEqual([[1,2,3]], utility.permutation(a, 3));
    });

    test('Failed with Size Exceed, Permutation', function() {
        var a = [1,2,3];
        (function() { utility.permutation(a, 4); }).should.throw('Number Exceed the Array Size');
    });

    test('xor', function() {
        assert.equal(9, utility.xor(10, 3));
    });

    test('hex', function() {
        assert.equal('0', utility.hex(0));
        assert.equal('1', utility.hex(1));
        assert.equal('2', utility.hex(2));
        assert.equal('3', utility.hex(3));
        assert.equal('4', utility.hex(4));
        assert.equal('5', utility.hex(5));
        assert.equal('6', utility.hex(6));
        assert.equal('7', utility.hex(7));
        assert.equal('8', utility.hex(8));
        assert.equal('9', utility.hex(9));
        assert.equal('a', utility.hex(10));
        assert.equal('b', utility.hex(11));
        assert.equal('c', utility.hex(12));
        assert.equal('d', utility.hex(13));
        assert.equal('e', utility.hex(14));
        assert.equal('f', utility.hex(15));
    });

    test('isArray', function() {
        assert.equal(true, utility.isArray([1,2,3]));
        assert.equal(true, utility.isArray([[1,2],[2,3]]));
        assert.equal(false, utility.isArray(1));
        assert.equal(false, utility.isArray({1: 1,2: 2,3: 3}));
        assert.equal(false, utility.isArray('abc'));
    });

    test('isNumber', function() {
        assert.equal(true, utility.isNumber(1));
        assert.equal(false, utility.isNumber(true));
        assert.equal(false, utility.isNumber('abc'));
        assert.equal(false, utility.isNumber([]));
        assert.equal(false, utility.isNumber({1:2}));
    });

    test('getArrayDimension', function() {
        assert.deepEqual([2,2],utility.getArrayDimension([[1,2],[3,4]]));
        (function() { utility.getArrayDimension({1:2}); }).should.throw('Object is not an array');
        (function() { utility.getArrayDimension([{1:2}, {2:3}]); }).should.throw('Object is not an array');
        (function() { utility.getArrayDimension([[1,2],[1,2,3]]); }).should.throw('Row count doesn\'t match');
        (function() { utility.getArrayDimension([[1,2],[2,'3']]); }).should.throw('Entity is not a Number');
    });
});