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
classNames('foo');
classNames(null);
classNames(undefined);
classNames(true);
classNames(false);
classNames({ conditional: true });
classNames({ conditional: {} });
classNames({ conditional: Symbol() });
classNames([]);
classNames([['bar', null, undefined, true, false]]);
classNames(['bar', null, undefined, true, false]);
classNames('bar', null, undefined, true, false);
classNames('bar', ['abc', { foo: true }]);
classNames('bar', ['abc', { foo: true }], { def: false });
classNames('abc', true, false, undefined, null, { foo: true }, ['abc', true, false, undefined, null, { foo: true }]);
classNames('abc', true, false, undefined, null, { foo: true }, ['abc', true, false, undefined, null, { foo: true }], ['abc', 1234, true, false, undefined, null, { foo: true }] as const);
classNames(foo);
classNames(ifoo);
expectError(classNames(Symbol()));
expectError(classNames(42));
// should match tests/index.js
classNames('c', ['a', 'b']);
classNames('', 'b', {}, '');
classNames('a', null, undefined, true, 'b');
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
classNames({a: true}, 'b');
classNames({}, [{}, []]);
