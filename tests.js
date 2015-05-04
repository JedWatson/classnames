var assert = require("assert");
var classNames = require('./');
var dedupe = require('./dedupe');
var SPACE = /\s+/;

describe('classNames', function() {
  it('keeps object keys with truthy values', function() {
    assert.equal(classNames({
      a: true,
      b: false,
      c: 0,
      d: null,
      e: undefined,
      f: 1,
    }), 'a f');
  });

  it('joins arrays of class names and ignore falsy values', function() {
    assert.equal(classNames('a', 0, null, undefined, true, 1, 'b'), 'a 1 b');
  });

  it('supports heterogenous arguments', function() {
    assert.equal(classNames({a: true}, 'b', 0), 'a b');
  });

  it('should be trimmed', function() {
    assert.equal(classNames('', 'b', {}, ''), 'b');
  });

  it('returns an empty string for an empty configuration', function() {
    assert.equal(classNames({}), '');
  });

  it('supports an array of class names', function() {
    assert.equal(classNames(['a', 'b']), 'a b');
  });

  it('joins array arguments with string arguments', function() {
    assert.equal(classNames(['a', 'b'], 'c'), 'a b c');
    assert.equal(classNames('c', ['a', 'b']), 'c a b');
  });

  it('handles multiple array arguments', function() {
    assert.equal(classNames(['a', 'b'], ['c', 'd']), 'a b c d');
  });

  it('handles arrays that include falsy and true values', function() {
    assert.equal(classNames(['a', 0, null, undefined, false, true, 'b']), 'a b');
  });

  it('handles arrays that include arrays', function() {
    assert.equal(classNames(['a', ['b', 'c']]), 'a b c');
  });

  it('handles arrays that include objects', function() {
    assert.equal(classNames(['a', {b: true, c: false}]), 'a b');
  });

  it('handles deep array recursion', function() {
    assert.equal(classNames(['a', ['b', ['c', {d: true}]]]), 'a b c d');
  });
});

describe('dedupe', function () {
	function _hasSameClasses (c1, c2) {
		if (c1 === c2) {
			return true;
		}

		c1 = c1.split(SPACE).sort();
		c2 = c2.split(SPACE).sort();

		if (c1.length !== c2.length) {
			return false;
		}

		return c1.reduce(function (result, val, i) {
			return result &= (val === c2[i]);
		}, true);
	}

	
	it('keeps object keys with truthy values', function() {
		assert.equal(dedupe({
			a: true,
			b: false,
			c: 0,
			d: null,
			e: undefined,
			f: 1,
		}), 'a f');
	});

	it('should dedupe dedupe', function () {
		assert(_hasSameClasses(dedupe('foo', 'bar', 'foo', 'bar', { foo: true }), 'foo bar'));
	});

	it('should make sure subsequent objects can remove/add classes', function () {
		assert(_hasSameClasses(dedupe('foo', { foo: false }, { foo: true, bar: true }), 'foo bar'));
	});

	it('should make sure object with falsy value wipe out previous classes', function () {
		assert(_hasSameClasses(dedupe('foo foo', 0, null, undefined, true, 1, 'b', { 'foo': false }), '1 b'));
		assert(_hasSameClasses(dedupe("foo", "foobar", "bar", { foo: false }), "foobar bar"));
		assert(_hasSameClasses(dedupe("foo", "foo-bar", "bar", { foo: false }), "foo-bar bar"));
		assert(_hasSameClasses(dedupe("foo", "-moz-foo-bar", "bar", { foo: false }), "-moz-foo-bar bar"));
	});

	it('joins arrays of class names and ignore falsy values', function() {
		assert(_hasSameClasses(dedupe('a', 0, null, undefined, true, 1, 'b'), 'a 1 b'));
	});

	it('supports heterogenous arguments', function() {
		assert(_hasSameClasses(dedupe({a: true}, 'b', 0), 'a b'));
	});

	it('should be trimmed', function() {
		assert(_hasSameClasses(dedupe('', 'b', {}, ''), 'b'));
	});

	it('returns an empty string for an empty configuration', function() {
		assert(_hasSameClasses(dedupe({}), ''));
	});

	it('supports an array of class names', function() {
		assert(_hasSameClasses(dedupe(['a', 'b']), 'a b'));
	});

	it('joins array arguments with string arguments', function() {
		assert(_hasSameClasses(dedupe(['a', 'b'], 'c'), 'a b c'));
		assert(_hasSameClasses(dedupe('c', ['a', 'b']), 'c a b'));
	});

	it('handles multiple array arguments', function() {
		assert(_hasSameClasses(dedupe(['a', 'b'], ['c', 'd']), 'a b c d'));
	});

	it('handles arrays that include falsy and true values', function() {
		assert(_hasSameClasses(dedupe(['a', 0, null, undefined, false, true, 'b']), 'a b'));
	});

	it('handles arrays that include arrays', function() {
		assert(_hasSameClasses(dedupe(['a', ['b', 'c']]), 'a b c'));
	});

	it('handles arrays that include objects', function() {
		assert(_hasSameClasses(dedupe(['a', {b: true, c: false}]), 'a b'));
	});

	it('handles deep array recursion', function() {
		assert(_hasSameClasses(dedupe(['a', ['b', ['c', {d: true}]]]), 'a b c d'));
	});
});
