/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

var classNames = (function () {
	'use strict';

	function _parseArray (resultSet, array) {
		var length = array.length;

		for (var i = 0; i < length; ++i) {
			_parse(resultSet, array[i]);
		}
	}

	function _parseNumber (resultSet, num) {
		resultSet[num] = true;
	}

	function _parseObject (resultSet, object) {
		for (var k in object) {
			if (object.hasOwnProperty(k)) {
				if (object[k]) {
					resultSet[k] = true;

				} else {
					delete resultSet[k];
				}
			}
		}
	}

	var SPACE = /\s+/;
	function _parseString (resultSet, str) {
		var array = str.split(SPACE);
		var length = array.length;

		for (var i = 0; i < length; ++i) {
			resultSet[array[i]] = true;
		}
	}

	function _parse (resultSet, arg) {
		if (!arg) return;
		var argType = typeof arg;

		// 'foo bar'
		if ('string' === argType) {
			_parseString(resultSet, arg);

		// ['foo', 'bar', ...]
		} else if (Array.isArray(arg)) {
			_parseArray(resultSet, arg);

		// { 'foo': true, ... }
		} else if ('object' === argType) {
			_parseObject(resultSet, arg);

		// '130'
		} else if ('number' === argType) {
			_parseNumber(resultSet, arg);
		}
	}

	function _classNames () {
		var classSet = {};
		_parseArray(classSet, arguments);

		var classes = '';
		for (var k in classSet) {
			classes += ' ' + k;
		}

		return classes.substr(1);
	}

	return _classNames;

})();

// safely export classNames for node / browserify
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}

/* global define */
// safely export classNames for RequireJS
if (typeof define !== 'undefined' && define.amd) {
	define('classNames', [], function() {
		return classNames;
	});
}
