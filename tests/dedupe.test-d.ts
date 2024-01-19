import {expectError} from 'tsd';
import dedupe from '../dedupe';

type Foo = {
  bar: boolean;
};

const foo: Foo = { bar: true };

interface IFoo {
  bar: boolean;
}

const ifoo: IFoo = { bar: true };

// dedupe
dedupe('foo');
dedupe(null);
dedupe(undefined);
dedupe(true);
dedupe(false);
dedupe({ conditional: true });
dedupe({ conditional: {} });
dedupe({ conditional: Symbol() });
dedupe([]);
dedupe([['bar', null, undefined, true, false]]);
dedupe(['bar', null, undefined, true, false]);
dedupe('bar', null, undefined, true, false);
dedupe('bar', ['abc', { foo: true }]);
dedupe('bar', ['abc', { foo: true }], { def: false });
dedupe('abc', true, false, undefined, null, { foo: true }, ['abc', true, false, undefined, null, { foo: true }]);
dedupe(foo);
dedupe(ifoo);
expectError(dedupe(Symbol()));
expectError(dedupe(42));
