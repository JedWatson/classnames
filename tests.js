var assert = require("assert");
var classNames = require('./');

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

  it('joins arrays of class names and ignore non-string values', function() {
    assert.equal(classNames('a', 0, null, undefined, true, 1, 'b'), 'a b');
  });

  it('supports heterogenous arguments', function() {
    assert.equal(classNames({a: true}, 'b', 0), 'a b');
  });

  it('returns an empty string for an empty configuration', function() {
    assert.equal(classNames({}), '');
  });
});
