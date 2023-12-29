import {expectError} from 'tsd';
import bind from '../bind';

type Foo = {
  bar: boolean;
};

const foo: Foo = { bar: true };

interface IFoo {
  bar: boolean;
}

const ifoo: IFoo = { bar: true };

// bind
const bound = bind.bind({foo: 'bar'});
bind.bind(undefined);
expectError(bind.bind(Symbol()));
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
expectError(bound(Symbol()));
