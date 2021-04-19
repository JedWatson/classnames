/* global describe, it */

import { strictEqual } from 'node:assert';
import dedupe from '../dedupe.js';

describe('dedupe', function () {
	it('keeps object keys with truthy values', function () {
		strictEqual(dedupe({
			a: true,
			b: false,
			c: 0,
			d: null,
			e: undefined,
			f: 1
		}), 'a f');
	});

	it('should dedupe dedupe', function () {
		strictEqual(dedupe('foo', 'bar', 'foo', 'bar', { foo: true }), 'foo bar');
	});

	it('should make sure subsequent objects can remove/add classes', function () {
		strictEqual(dedupe('foo', { foo: false }, { foo: true, bar: true }), 'foo bar');
	});

	it('should make sure object with falsy value wipe out previous classes', function () {
		strictEqual(dedupe('foo foo', 0, null, undefined, true, 1, 'b', { 'foo': false }), '1 b');
		strictEqual(dedupe('foo', 'foobar', 'bar', { foo: false }), 'foobar bar');
		strictEqual(dedupe('foo', 'foo-bar', 'bar', { foo: false }), 'foo-bar bar');
		strictEqual(dedupe('foo', '-moz-foo-bar', 'bar', { foo: false }), '-moz-foo-bar bar');
	});

	it('joins arrays of class names and ignore falsy values', function () {
		strictEqual(dedupe('a', 0, null, undefined, true, 1, 'b'), '1 a b');
	});

	it('supports heterogenous arguments', function () {
		strictEqual(dedupe({a: true}, 'b', 0), 'a b');
	});

	it('should be trimmed', function () {
		strictEqual(dedupe('', 'b', {}, ''), 'b');
	});

	it('returns an empty string for an empty configuration', function () {
		strictEqual(dedupe({}), '');
	});

	it('supports an array of class names', function () {
		strictEqual(dedupe(['a', 'b']), 'a b');
	});

	it('joins array arguments with string arguments', function () {
		strictEqual(dedupe(['a', 'b'], 'c'), 'a b c');
		strictEqual(dedupe('c', ['a', 'b']), 'c a b');
	});

	it('handles multiple array arguments', function () {
		strictEqual(dedupe(['a', 'b'], ['c', 'd']), 'a b c d');
	});

	it('handles arrays that include falsy and true values', function () {
		strictEqual(dedupe(['a', 0, null, undefined, false, true, 'b']), 'a b');
	});

	it('handles arrays that include arrays', function () {
		strictEqual(dedupe(['a', ['b', 'c']]), 'a b c');
	});

	it('handles arrays that include objects', function () {
		strictEqual(dedupe(['a', {b: true, c: false}]), 'a b');
	});

	it('handles deep array recursion', function () {
		strictEqual(dedupe(['a', ['b', ['c', {d: true}]]]), 'a b c d');
	});

	it('handles own toString() method defined on object', function () {
		strictEqual(dedupe({
			toString: function () { return 'classFromMethod'; }
		}), 'classFromMethod');
	});

	it('handles toString() method defined inherited in object', function () {
		var Class1 = function() {};
		var Class2 = function() {};
		Class1.prototype.toString = function() { return 'classFromMethod'; }
		Class2.prototype = Object.create(Class1.prototype);

		strictEqual(dedupe(new Class2()), 'classFromMethod');
	});
});
