import {expectError} from 'tsd';
import classNames from '..';

type Foo = {
  bar: boolean;
};

const foo: Foo = { bar: true };

interface IFoo {
  bar: boolean;
}

const ifoo: IFoo = { bar: true };

// default
classNames.default('foo');
classNames('foo');
classNames(null);
classNames(undefined);
classNames(true);
classNames(false);
classNames(42);
classNames(42n);
classNames({ conditional: true });
classNames({ conditional: {} });
classNames({ conditional: Symbol() });
classNames([]);
classNames([['bar', null, undefined, true, false, 1234, 1234n]]);
classNames(['bar', null, undefined, true, false, 1234, 1234n]);
classNames('bar', null, undefined, true, false, 1234, 1234n);
classNames('bar', ['abc', { foo: true }]);
classNames('bar', ['abc', { foo: true }], { def: false, ijk: 1234 });
classNames('abc', 1234, 1234n, true, false, undefined, null, { foo: true }, ['abc', 1234, 1234n, true, false, undefined, null, { foo: true }]);
classNames('abc', 1234, 1234n, true, false, undefined, null, { foo: true }, ['abc', 1234, 1234n, true, false, undefined, null, { foo: true }], ['abc', 1234, 1234n, true, false, undefined, null, { foo: true }] as const);
classNames(foo);
classNames(ifoo);
expectError(classNames(Symbol()));
// should match tests/index.js
classNames('c', ['a', 'b']);
classNames('', 'b', {}, '');
classNames('a', 0, 0n, null, undefined, true, 1, 1n, 'b');
classNames('a', [[]]);
classNames('a', []);
classNames('c', ['a', 'b']);
classNames(['a', 'b']);
classNames(['a', 'b'], 'c');
classNames(['a', 'b'], ['c', 'd']);
classNames(['a', 0, 0n, null, undefined, false, true, 'b']);
classNames(['a', ['b', 'c']]);
classNames(['a', ['b', ['c', {d: true}]]]);
classNames(['a', {b: true, c: false}]);
classNames({a: true}, 'b', 0);
classNames({}, Infinity, [{}, []]);
