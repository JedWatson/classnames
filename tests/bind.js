import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import classNames from '../bind.js';

const cssModulesMock = {
	a: '#a',
	b: '#b',
	c: '#c',
	d: '#d',
	e: '#e',
	f: '#f'
};

const classNamesBound = classNames.bind(cssModulesMock);

describe('bind', () => {
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

		it('handles own toString() method defined on object', () => {
			assert.equal(classNames({
				toString: () => { return 'classFromMethod'; }
			}), 'classFromMethod');
		});
	});

	describe('classNamesBound', () => {
		it('keeps object keys with truthy values', () => {
			assert.equal(classNamesBound({
				a: true,
				b: false,
				c: 0,
				d: null,
				e: undefined,
				f: 1
			}), '#a #f');
		});

		it('keeps class names undefined in bound hash', () => {
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
		});

		it('joins arrays of class names and ignore falsy values', () => {
			assert.equal(classNamesBound('a', 0, null, undefined, false, 1, 'b'), '#a #b');
		});

		it('supports heterogenous arguments', () => {
			assert.equal(classNamesBound({a: true}, 'b', 0), '#a #b');
		});

		it('should be trimmed', () => {
			assert.equal(classNamesBound('', 'b', {}, ''), '#b');
		});

		it('returns an empty string for an empty configuration', () => {
			assert.equal(classNamesBound({}), '');
		});

		it('supports an array of class names', () => {
			assert.equal(classNamesBound(['a', 'b']), '#a #b');
		});

		it('joins array arguments with string arguments', () => {
			assert.equal(classNamesBound(['a', 'b'], 'c'), '#a #b #c');
			assert.equal(classNamesBound('c', ['a', 'b']), '#c #a #b');
		});

		it('handles multiple array arguments', () => {
			assert.equal(classNamesBound(['a', 'b'], ['c', 'd']), '#a #b #c #d');
		});

		it('handles arrays that include falsy and true values', () => {
			assert.equal(classNamesBound(['a', 0, null, undefined, false, true, 'b']), '#a #b');
		});

		it('handles arrays that include arrays', () => {
			assert.equal(classNamesBound(['a', ['b', 'c']]), '#a #b #c');
		});

		it('handles arrays that include objects', () => {
			assert.equal(classNamesBound(['a', {b: true, c: false}]), '#a #b');
		});

		it('handles deep array recursion', () => {
			assert.equal(classNamesBound(['a', ['b', ['c', {d: true}]]]), '#a #b #c #d');
		});

		it('handles own toString() method defined on object', () => {
			assert.equal(classNamesBound({
				toString: () => { return 'classFromMethod'; }
			}), 'classFromMethod');
		});

		it('handles toString() method defined inherited in object', () => {
			class Class1 { toString() { return 'classFromMethod'; } }
			class Class2 extends Class1 {}

			assert.equal(classNamesBound(new Class2()), 'classFromMethod');
		});
	});
})
