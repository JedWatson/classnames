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
bound({ conditional: true });
bound({ conditional: {} });
bound({ conditional: Symbol() });
bound([]);
bound([['bar', null, undefined, true, false]]);
bound(['bar', null, undefined, true, false]);
bound('bar', null, undefined, true, false);
bound('bar', ['abc', { foo: true }]);
bound('bar', ['abc', { foo: true }], { def: false });
bound('abc', true, false, undefined, null, { foo: true }, ['abc', true, false, undefined, null, { foo: true }]);
bound(foo);
bound(ifoo);
expectError(bound(Symbol()));
expectError(bound(42));
