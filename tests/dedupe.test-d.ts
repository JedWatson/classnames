import {expectError} from 'tsd';
import dedupe from '../dedupe';

// dedupe
dedupe.default('foo');
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
expectError(dedupe(Symbol()));
expectError(dedupe([Symbol()]));
expectError(dedupe([[Symbol()]]));
