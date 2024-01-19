import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import classNames from '../index.js';

describe('classNames', () => {
	it('keeps object keys with truthy values', () => {
		assert.equal(classNames({
			a: true,
			b: false,
			c: 0,
			d: null,
			e: undefined,
			f: 1
		}), 'a f');
	});

	it('joins arrays of class names and ignore falsy values', () => {
		assert.equal(classNames('a', 0, null, undefined, false, 'b'), 'a b');
	});

	it('supports heterogenous arguments', () => {
		assert.equal(classNames({a: true}, 'b', 0), 'a b');
	});

	it('should be trimmed', () => {
		assert.equal(classNames('', 'b', {}, ''), 'b');
	});

	it('returns an empty string for an empty configuration', () => {
		assert.equal(classNames({}), '');
	});

	it('supports an array of class names', () => {
		assert.equal(classNames(['a', 'b']), 'a b');
	});

	it('joins array arguments with string arguments', () => {
		assert.equal(classNames(['a', 'b'], 'c'), 'a b c');
		assert.equal(classNames('c', ['a', 'b']), 'c a b');
	});

	it('handles multiple array arguments', () => {
		assert.equal(classNames(['a', 'b'], ['c', 'd']), 'a b c d');
	});

	it('handles arrays that include falsy and true values', () => {
		assert.equal(classNames(['a', 0, null, undefined, false, true, 'b']), 'a b');
	});

	it('handles arrays that include arrays', () => {
		assert.equal(classNames(['a', ['b', 'c']]), 'a b c');
	});

	it('handles arrays that include objects', () => {
		assert.equal(classNames(['a', {b: true, c: false}]), 'a b');
	});

	it('handles deep array recursion', () => {
		assert.equal(classNames(['a', ['b', ['c', {d: true}]]]), 'a b c d');
	});

	it('handles arrays that are empty', () => {
		assert.equal(classNames('a', []), 'a');
	});

	it('handles nested arrays that have empty nested arrays', () => {
		assert.equal(classNames('a', [[]]), 'a');
	});

	it('handles all types of truthy and falsy property values as expected', () => {
		assert.equal(classNames({
			// falsy:
			null: null,
			emptyString: '',
			noNumber: NaN,
			zero: 0,
			negativeZero: -0,
			false: false,
			undefined: undefined,

			// truthy (literally anything else):
			nonEmptyString: 'foobar',
			whitespace: ' ',
			function: Object.prototype.toString,
			emptyObject: {},
			nonEmptyObject: {a: 1, b: 2},
			emptyList: [],
			nonEmptyList: [1, 2, 3],
			greaterZero: 1
		}), 'nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero');
	});

	it('handles toString() method defined on object', () => {
		assert.equal(classNames({
			toString: () => { return 'classFromMethod'; }
		}), 'classFromMethod');
	});

	it('handles toString() method defined inherited in object', () => {
		class Class1 { toString() { return 'classFromMethod'; } }
		class Class2 extends Class1 {}

		assert.equal(classNames(new Class2()), 'classFromMethod');
	});

	it('handles objects in a VM', () => {
		const context = { classNames, output: undefined };
		vm.createContext(context);

		const code = 'output = classNames({ a: true, b: true });';

		vm.runInContext(code, context);
		assert.equal(context.output, 'a b');
	});
});
