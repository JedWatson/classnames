import classNames = require('classnames');
import dedupe = require('classnames/dedupe');
import bind = require('classnames/bind');

type Foo = {
  bar: boolean;
};

const foo: Foo = { bar: true };

interface IFoo {
  bar: boolean;
}

const ifoo: IFoo = { bar: true };

// default
classNames('foo');
classNames(null);
classNames(undefined);
classNames(true);
classNames(false);
classNames(42);
classNames({ conditional: true });
classNames({ conditional: {} });
classNames({ conditional: Symbol() });
classNames([]);
classNames([['bar', null, undefined, true, false, 1234]]);
classNames(['bar', null, undefined, true, false, 1234]);
classNames('bar', null, undefined, true, false, 1234);
classNames('bar', ['abc', { foo: true }]);
classNames('bar', ['abc', { foo: true }], { def: false, ijk: 1234 });
classNames('abc', 1234, true, false, undefined, null, { foo: true }, ['abc', 1234, true, false, undefined, null, { foo: true }]);
classNames(foo);
classNames(ifoo);
// $ExpectError
classNames(Symbol());
// $ExpectError
classNames([Symbol()]);
// $ExpectError
classNames([[Symbol()]]);

// should match tests/index.js
classNames('c', ['a', 'b']);
classNames('', 'b', {}, '');
classNames('a', 0, null, undefined, true, 1, 'b');
classNames('a', [[]]);
classNames('a', []);
classNames('c', ['a', 'b']);
classNames(['a', 'b']);
classNames(['a', 'b'], 'c');
classNames(['a', 'b'], ['c', 'd']);
classNames(['a', 0, null, undefined, false, true, 'b']);
classNames(['a', ['b', 'c']]);
classNames(['a', ['b', ['c', {d: true}]]]);
classNames(['a', {b: true, c: false}]);
classNames({a: true}, 'b', 0);
classNames({}, Infinity, [{}, []]);

// dedupe
dedupe('foo');
dedupe(null);
dedupe(undefined);
dedupe(true);
dedupe(false);
dedupe(42);
dedupe({ conditional: true });
dedupe({ conditional: {} });
dedupe({ conditional: Symbol() });
dedupe([]);
dedupe([['bar', null, undefined, true, false, 1234]]);
dedupe(['bar', null, undefined, true, false, 1234]);
dedupe('bar', null, undefined, true, false, 1234);
dedupe('bar', ['abc', { foo: true }]);
dedupe('bar', ['abc', { foo: true }], { def: false, ijk: 1234 });
dedupe('abc', 1234, true, false, undefined, null, { foo: true }, ['abc', 1234, true, false, undefined, null, { foo: true }]);
dedupe(foo);
dedupe(ifoo);
// $ExpectError
dedupe(Symbol());
// $ExpectError
dedupe([Symbol()]);
// $ExpectError
dedupe([[Symbol()]]);

// bind
const bound = bind.bind({foo: 'bar'});
bind.bind(undefined);
// $ExpectError
bind.bind(Symbol());
bound('foo');
bound(null);
bound(undefined);
bound(true);
bound(false);
bound(42);
bound({ conditional: true });
bound({ conditional: {} });
bound({ conditional: Symbol() });
bound([]);
bound([['bar', null, undefined, true, false, 1234]]);
bound(['bar', null, undefined, true, false, 1234]);
bound('bar', null, undefined, true, false, 1234);
bound('bar', ['abc', { foo: true }]);
bound('bar', ['abc', { foo: true }], { def: false, ijk: 1234 });
bound('abc', 1234, true, false, undefined, null, { foo: true }, ['abc', 1234, true, false, undefined, null, { foo: true }]);
bound(foo);
bound(ifoo);
// $ExpectError
bound(Symbol());
// $ExpectError
bound([Symbol()]);
// $ExpectError
bound([[Symbol()]]);
