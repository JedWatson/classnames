import classNames from 'classnames';
import dedupe from 'classnames/dedupe';
import bind from 'classnames/bind';

// index
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
classNames([['bar', null, undefined, true, false, 1337]]);
classNames(['bar', null, undefined, true, false, 1337]);
classNames('bar', null, undefined, true, false, 1337);
// $ExpectError
classNames(Symbol());
// $ExpectError
classNames([Symbol()]);
// $ExpectError
classNames([[Symbol()]]);

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
dedupe([['bar', null, undefined, true, false, 1337]]);
dedupe(['bar', null, undefined, true, false, 1337]);
dedupe('bar', null, undefined, true, false, 1337);
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
bound([['bar', null, undefined, true, false, 1337]]);
bound(['bar', null, undefined, true, false, 1337]);
bound('bar', null, undefined, true, false, 1337);
// $ExpectError
bound(Symbol());
// $ExpectError
bound([Symbol()]);
// $ExpectError
bound([[Symbol()]]);
