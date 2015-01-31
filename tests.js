var assert = require("assert");
var classnames = require('./');

describe('classnames', function() {
  it('keeps object keys with truthy values', function() {
    assert.equal(classnames({
      a: true,
      b: false,
      c: 0,
      d: null,
      e: undefined,
      f: 1,
    }), 'a f');
  });

  it('joins arrays of class names and ignore falsy values', function() {
    assert.equal(classnames('a', 0, 'b'), 'a b');
  });

  it('supports heterogenous arguments', function() {
    assert.equal(classnames({a: true}, 'b', 0), 'a b');
  });
});
