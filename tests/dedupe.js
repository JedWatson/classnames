import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import dedupe from '../dedupe.js';

describe('dedupe', () => {
	it('keeps object keys with truthy values', () => {
		assert.equal(dedupe({
			a: true,
			b: false,
			c: 0,
			d: null,
			e: undefined,
			f: 1
		}), 'a f');
	});

	it('should dedupe', () => {
		assert.equal(dedupe('foo', 'bar', 'foo', 'bar', { foo: true }), 'foo bar');
	});

	it('should make sure subsequent objects can remove/add classes', () => {
		assert.equal(dedupe('foo', { foo: false }, { foo: true, bar: true }), 'foo bar');
	});

	it('should make sure object with falsy value wipe out previous classes', () => {
		assert.equal(dedupe('foo foo', 0, null, undefined, false, 'b', { 'foo': false }), 'b');
		assert.equal(dedupe('foo', 'foobar', 'bar', { foo: false }), 'foobar bar');
		assert.equal(dedupe('foo', 'foo-bar', 'bar', { foo: false }), 'foo-bar bar');
		assert.equal(dedupe('foo', '-moz-foo-bar', 'bar', { foo: false }), '-moz-foo-bar bar');
	});

	it('joins arrays of class names and ignore falsy values', () => {
		assert.equal(dedupe('a', 0, null, undefined, false, 'b'), 'a b');
	});

	it('supports heterogenous arguments', () => {
		assert.equal(dedupe({a: true}, 'b', 0), 'a b');
	});

	it('should be trimmed', () => {
		assert.equal(dedupe('', 'b', {}, ''), 'b');
	});

	it('returns an empty string for an empty configuration', () => {
		assert.equal(dedupe({}), '');
	});

	it('supports an array of class names', () => {
		assert.equal(dedupe(['a', 'b']), 'a b');
	});

	it('joins array arguments with string arguments', () => {
		assert.equal(dedupe(['a', 'b'], 'c'), 'a b c');
		assert.equal(dedupe('c', ['a', 'b']), 'c a b');
	});

	it('handles multiple array arguments', () => {
		assert.equal(dedupe(['a', 'b'], ['c', 'd']), 'a b c d');
	});

	it('handles arrays that include falsy and true values', () => {
		assert.equal(dedupe(['a', 0, null, undefined, false, true, 'b']), 'a b');
	});

	it('handles arrays that include arrays', () => {
		assert.equal(dedupe(['a', ['b', 'c']]), 'a b c');
	});

	it('handles arrays that include objects', () => {
		assert.equal(dedupe(['a', {b: true, c: false}]), 'a b');
	});

	it('handles deep array recursion', () => {
		assert.equal(dedupe(['a', ['b', ['c', {d: true}]]]), 'a b c d');
	});

	it('handles own toString() method defined on object', () => {
		assert.equal(dedupe({
			toString: () => { return 'classFromMethod'; }
		}), 'classFromMethod');
	});

	it('handles toString() method defined inherited in object', () => {
		class Class1 { toString() { return 'classFromMethod'; } }
		class Class2 extends Class1 {}

		assert.equal(dedupe(new Class2()), 'classFromMethod');
	});
});
