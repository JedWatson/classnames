/* global describe, it */

import { strictEqual } from 'node:assert';
import classNames from '../index.js';

describe('classNames', function () {
	it('keeps object keys with truthy values', function () {
		strictEqual(classNames({
			a: true,
			b: false,
			c: 0,
			d: null,
			e: undefined,
			f: 1
		}), 'a f');
	});

	it('joins arrays of class names and ignore falsy values', function () {
		strictEqual(classNames('a', 0, null, undefined, true, 1, 'b'), 'a 1 b');
	});

	it('supports heterogenous arguments', function () {
		strictEqual(classNames({a: true}, 'b', 0), 'a b');
	});

	it('should be trimmed', function () {
		strictEqual(classNames('', 'b', {}, ''), 'b');
	});

	it('returns an empty string for an empty configuration', function () {
		strictEqual(classNames({}), '');
	});

	it('supports an array of class names', function () {
		strictEqual(classNames(['a', 'b']), 'a b');
	});

	it('joins array arguments with string arguments', function () {
		strictEqual(classNames(['a', 'b'], 'c'), 'a b c');
		strictEqual(classNames('c', ['a', 'b']), 'c a b');
	});

	it('handles multiple array arguments', function () {
		strictEqual(classNames(['a', 'b'], ['c', 'd']), 'a b c d');
	});

	it('handles arrays that include falsy and true values', function () {
		strictEqual(classNames(['a', 0, null, undefined, false, true, 'b']), 'a b');
	});

	it('handles arrays that include arrays', function () {
		strictEqual(classNames(['a', ['b', 'c']]), 'a b c');
	});

	it('handles arrays that include objects', function () {
		strictEqual(classNames(['a', {b: true, c: false}]), 'a b');
	});

	it('handles deep array recursion', function () {
		strictEqual(classNames(['a', ['b', ['c', {d: true}]]]), 'a b c d');
	});

	it('handles arrays that are empty', function () {
		strictEqual(classNames('a', []), 'a');
	});

	it('handles nested arrays that have empty nested arrays', function () {
		strictEqual(classNames('a', [[]]), 'a');
	});

	it('handles all types of truthy and falsy property values as expected', function () {
		strictEqual(classNames({
			// falsy:
			null: null,
			emptyString: "",
			noNumber: NaN,
			zero: 0,
			negativeZero: -0,
			false: false,
			undefined: undefined,

			// truthy (literally anything else):
			nonEmptyString: "foobar",
			whitespace: ' ',
			function: Object.prototype.toString,
			emptyObject: {},
			nonEmptyObject: {a: 1, b: 2},
			emptyList: [],
			nonEmptyList: [1, 2, 3],
			greaterZero: 1
		}), 'nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero');
	});

	it('handles toString() method defined on object', function () {
		strictEqual(classNames({
			toString: function () { return 'classFromMethod'; }
		}), 'classFromMethod');
	});

	it('handles toString() method defined inherited in object', function () {
		var Class1 = function() {};
		var Class2 = function() {};
		Class1.prototype.toString = function() { return 'classFromMethod'; }
		Class2.prototype = Object.create(Class1.prototype);

		strictEqual(classNames(new Class2()), 'classFromMethod');
	});
});
