/* global describe, it */

var assert = require('assert');
var dedupe = require('../dedupe');

describe('dedupe', function () {
	it('keeps object keys with truthy values', function () {
		assert.equal(dedupe({
			a: true,
			b: false,
			c: 0,
			d: null,
			e: undefined,
			f: 1
		}), 'a f');
	});

	it('should dedupe dedupe', function () {
		assert.equal(dedupe('foo', 'bar', 'foo', 'bar', { foo: true }), 'foo bar');
	});

	it('should make sure subsequent objects can remove/add classes', function () {
		assert.equal(dedupe('foo', { foo: false }, { foo: true, bar: true }), 'foo bar');
	});

	it('should make sure object with falsy value wipe out previous classes', function () {
		assert.equal(dedupe('foo foo', 0, null, undefined, true, 1, 'b', { 'foo': false }), '1 b');
		assert.equal(dedupe('foo', 'foobar', 'bar', { foo: false }), 'foobar bar');
		assert.equal(dedupe('foo', 'foo-bar', 'bar', { foo: false }), 'foo-bar bar');
		assert.equal(dedupe('foo', '-moz-foo-bar', 'bar', { foo: false }), '-moz-foo-bar bar');
	});

	it('joins arrays of class names and ignore falsy values', function () {
		assert.equal(dedupe('a', 0, null, undefined, true, 1, 'b'), '1 a b');
	});

	it('supports heterogenous arguments', function () {
		assert.equal(dedupe({a: true}, 'b', 0), 'a b');
	});

	it('should be trimmed', function () {
		assert.equal(dedupe('', 'b', {}, ''), 'b');
	});

	it('returns an empty string for an empty configuration', function () {
		assert.equal(dedupe({}), '');
	});

	it('supports an array of class names', function () {
		assert.equal(dedupe(['a', 'b']), 'a b');
	});

	it('joins array arguments with string arguments', function () {
		assert.equal(dedupe(['a', 'b'], 'c'), 'a b c');
		assert.equal(dedupe('c', ['a', 'b']), 'c a b');
	});

	it('handles multiple array arguments', function () {
		assert.equal(dedupe(['a', 'b'], ['c', 'd']), 'a b c d');
	});

	it('handles arrays that include falsy and true values', function () {
		assert.equal(dedupe(['a', 0, null, undefined, false, true, 'b']), 'a b');
	});

	it('handles arrays that include arrays', function () {
		assert.equal(dedupe(['a', ['b', 'c']]), 'a b c');
	});

	it('handles arrays that include objects', function () {
		assert.equal(dedupe(['a', {b: true, c: false}]), 'a b');
	});

	it('handles deep array recursion', function () {
		assert.equal(dedupe(['a', ['b', ['c', {d: true}]]]), 'a b c d');
	});
});
