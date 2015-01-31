Classnames
===========

A simple javascript utility for conditionally joining classNames together.

Install with npm, or download the [UMD version](http://wzrd.in/standalone/classnames@1) (provides window.classnames, or defines the AMD modules 'classnames').

```sh
npm install classnames
```

The `classnames` function takes any number of arguments which can be a string or object.
The argument `'foo'` is short for `{foo: true}`.  If the value of the key is falsy, it won't be included in the output.

```js
classnames('foo', 'bar'); // => 'foo bar'
classnames('foo', {bar: true}); // => 'foo bar'
classnames({foo: true}, {bar: true}); // => 'foo bar'
classnames({foo: true, bar: true}); // => 'foo bar'

// lots of arguments of various types
classnames('foo', {bar: true, duck: false}, 'baz', {quux: true}) // => 'foo bar baz quux'

// other falsy values are just ignored
classnames(null, false, 'bar', undefined, 0, {baz: null}, ''); // => 'bar'

// if you have an array of these, use apply
var array = ['foo', {bar: true}];
classnames.apply(null, array); // => 'foo bar'
```
