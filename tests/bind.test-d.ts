import {expectError} from 'tsd';
import bind from '../bind';

// bind
bind.default.bind({foo: 'bar'});
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
expectError(bound(Symbol()));
expectError(bound([Symbol()]));
expectError(bound([[Symbol()]]));
