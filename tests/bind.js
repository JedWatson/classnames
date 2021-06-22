/* global describe, it */

import { strictEqual } from 'node:assert';
import classNames from '../bind.js';

var cssModulesMock = {
	a: "#a",
	b: "#b",
	c: "#c",
	d: "#d",
	e: "#e",
	f: "#f"
};

var classNamesBound = classNames.bind(cssModulesMock);

describe('bind', function () {
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

		it('handles own toString() method defined on object', function () {
			strictEqual(classNames({
				toString: function () { return 'classFromMethod'; }
			}), 'classFromMethod');
		});
	});

	describe('classNamesBound', function () {
		it('keeps object keys with truthy values', function () {
			strictEqual(classNamesBound({
				a: true,
				b: false,
				c: 0,
				d: null,
				e: undefined,
				f: 1
			}), '#a #f');
		});
		it('keeps class names undefined in bound hash', function () {
			strictEqual(classNamesBound({
				a: true,
				b: false,
				c: 0,
				d: null,
				e: undefined,
				f: 1,
				x: true,
				y: null,
				z: 1
			}), '#a #f x z');
		})
		it('joins arrays of class names and ignore falsy values', function () {
			strictEqual(classNamesBound('a', 0, null, undefined, true, 1, 'b'), '#a 1 #b');
		});

		it('supports heterogenous arguments', function () {
			strictEqual(classNamesBound({a: true}, 'b', 0), '#a #b');
		});

		it('should be trimmed', function () {
			strictEqual(classNamesBound('', 'b', {}, ''), '#b');
		});

		it('returns an empty string for an empty configuration', function () {
			strictEqual(classNamesBound({}), '');
		});

		it('supports an array of class names', function () {
			strictEqual(classNamesBound(['a', 'b']), '#a #b');
		});

		it('joins array arguments with string arguments', function () {
			strictEqual(classNamesBound(['a', 'b'], 'c'), '#a #b #c');
			strictEqual(classNamesBound('c', ['a', 'b']), '#c #a #b');
		});

		it('handles multiple array arguments', function () {
			strictEqual(classNamesBound(['a', 'b'], ['c', 'd']), '#a #b #c #d');
		});

		it('handles arrays that include falsy and true values', function () {
			strictEqual(classNamesBound(['a', 0, null, undefined, false, true, 'b']), '#a #b');
		});

		it('handles arrays that include arrays', function () {
			strictEqual(classNamesBound(['a', ['b', 'c']]), '#a #b #c');
		});

		it('handles arrays that include objects', function () {
			strictEqual(classNamesBound(['a', {b: true, c: false}]), '#a #b');
		});

		it('handles deep array recursion', function () {
			strictEqual(classNamesBound(['a', ['b', ['c', {d: true}]]]), '#a #b #c #d');
		});

		it('handles own toString() method defined on object', function () {
			strictEqual(classNamesBound({
				toString: function () { return 'classFromMethod'; }
			}), 'classFromMethod');
		});

		it('handles toString() method defined inherited in object', function () {
			var Class1 = function() {};
			var Class2 = function() {};
			Class1.prototype.toString = function() { return 'classFromMethod'; }
			Class2.prototype = Object.create(Class1.prototype);

			strictEqual(classNamesBound(new Class2()), 'classFromMethod');
		});
	});
})
