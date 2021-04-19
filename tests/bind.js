/* global describe, it */

var assert = require('assert');
var classNames = require('../bind');

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
			assert.equal(classNames({
				a: true,
				b: false,
				c: 0,
				d: null,
				e: undefined,
				f: 1
			}), 'a f');
		});

		it('joins arrays of class names and ignore falsy values', function () {
			assert.equal(classNames('a', 0, null, undefined, true, 1, 'b'), 'a 1 b');
		});

		it('supports heterogenous arguments', function () {
			assert.equal(classNames({a: true}, 'b', 0), 'a b');
		});

		it('should be trimmed', function () {
			assert.equal(classNames('', 'b', {}, ''), 'b');
		});

		it('returns an empty string for an empty configuration', function () {
			assert.equal(classNames({}), '');
		});

		it('supports an array of class names', function () {
			assert.equal(classNames(['a', 'b']), 'a b');
		});

		it('joins array arguments with string arguments', function () {
			assert.equal(classNames(['a', 'b'], 'c'), 'a b c');
			assert.equal(classNames('c', ['a', 'b']), 'c a b');
		});

		it('handles multiple array arguments', function () {
			assert.equal(classNames(['a', 'b'], ['c', 'd']), 'a b c d');
		});

		it('handles arrays that include falsy and true values', function () {
			assert.equal(classNames(['a', 0, null, undefined, false, true, 'b']), 'a b');
		});

		it('handles arrays that include arrays', function () {
			assert.equal(classNames(['a', ['b', 'c']]), 'a b c');
		});

		it('handles arrays that include objects', function () {
			assert.equal(classNames(['a', {b: true, c: false}]), 'a b');
		});

		it('handles deep array recursion', function () {
			assert.equal(classNames(['a', ['b', ['c', {d: true}]]]), 'a b c d');
		});

		it('handles own toString() method defined on object', function () {
			assert.equal(classNames({
				toString: function () { return 'classFromMethod'; }
			}), 'classFromMethod');
		});
	});

	describe('classNamesBound', function () {
		it('keeps object keys with truthy values', function () {
			assert.equal(classNamesBound({
				a: true,
				b: false,
				c: 0,
				d: null,
				e: undefined,
				f: 1
			}), '#a #f');
		});
		it('keeps class names undefined in bound hash', function () {
			assert.equal(classNamesBound({
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
			assert.equal(classNamesBound('a', 0, null, undefined, true, 1, 'b'), '#a 1 #b');
		});

		it('supports heterogenous arguments', function () {
			assert.equal(classNamesBound({a: true}, 'b', 0), '#a #b');
		});

		it('should be trimmed', function () {
			assert.equal(classNamesBound('', 'b', {}, ''), '#b');
		});

		it('returns an empty string for an empty configuration', function () {
			assert.equal(classNamesBound({}), '');
		});

		it('supports an array of class names', function () {
			assert.equal(classNamesBound(['a', 'b']), '#a #b');
		});

		it('joins array arguments with string arguments', function () {
			assert.equal(classNamesBound(['a', 'b'], 'c'), '#a #b #c');
			assert.equal(classNamesBound('c', ['a', 'b']), '#c #a #b');
		});

		it('handles multiple array arguments', function () {
			assert.equal(classNamesBound(['a', 'b'], ['c', 'd']), '#a #b #c #d');
		});

		it('handles arrays that include falsy and true values', function () {
			assert.equal(classNamesBound(['a', 0, null, undefined, false, true, 'b']), '#a #b');
		});

		it('handles arrays that include arrays', function () {
			assert.equal(classNamesBound(['a', ['b', 'c']]), '#a #b #c');
		});

		it('handles arrays that include objects', function () {
			assert.equal(classNamesBound(['a', {b: true, c: false}]), '#a #b');
		});

		it('handles deep array recursion', function () {
			assert.equal(classNamesBound(['a', ['b', ['c', {d: true}]]]), '#a #b #c #d');
		});

		it('handles own toString() method defined on object', function () {
			assert.equal(classNamesBound({
				toString: function () { return 'classFromMethod'; }
			}), 'classFromMethod');
		});

		it('handles toString() method defined inherited in object', function () {
			var Class1 = function() {};
			var Class2 = function() {};
			Class1.prototype.toString = function() { return 'classFromMethod'; }
			Class2.prototype = Object.create(Class1.prototype);

			assert.equal(classNamesBound(new Class2()), 'classFromMethod');
		});
	});
})
