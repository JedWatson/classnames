Classnames
===========

[![Version](http://img.shields.io/npm/v/classnames.svg)](https://www.npmjs.org/package/classnames)
[![Build Status](https://travis-ci.org/JedWatson/classnames.svg?branch=master)](https://travis-ci.org/JedWatson/classnames)

A simple javascript utility for conditionally joining classNames together.

Install with npm or Bower.

```sh
npm install classnames
```

Use with node.js, browserify or webpack:

```js
var classNames = require('classnames');
classNames('foo', 'bar'); // => 'foo bar'
```

Alternatively, you can simply include `index.js` on your page with a standalone `<script>` tag and it will export a global `classNames` method, or define the module if you are using RequireJS.

[Changelog](https://github.com/JedWatson/classnames/blob/master/HISTORY.md)

## Usage

The `classNames` function takes any number of arguments which can be a string or object.
The argument `'foo'` is short for `{ foo: true }`. If the value of the key is falsy, it won't be included in the output.

```js
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }) // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

Arrays will be recursively flattened as per the rules above:

```js
var arr = ['b', { c: true, d: false }];
classNames('a', arr); // => 'a b c'
```

### Alternate `dedupe` version

There is an alternate version of `classNames` available which correctly dedupes classes and ensures that falsy classes specified in later arguments are excluded from the result set.

For example:

```js
classNames('foo', 'foo', 'bar'); // => 'foo bar'
classNames('foo', { foo: false, bar: true }); // => 'bar'
```

This version is slower (about 10x) so it is offered as an opt-in.

To use the dedupe version with node, browserify or webpack:

```js
var classNames = require('classnames/dedupe');
```

Or for standalone (global / AMD) use, include `dedupe.js` in a `<script>` tag on your page.


## Polyfills needed to support older browsers

#### `classNames >=2.0.0`

`Array.isArray`: see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
 for details about unsupported older browsers (e.g. <= IE8) and a simple polyfill.

## License

[MIT](LICENSE)
