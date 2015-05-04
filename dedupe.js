/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

var classNames = (function () {
	'use strict';

	var SPACE = /\s+/;
	var toString = Object.prototype.toString;

	function _parse (result, arg) {
		if (!arg) {
			return;
		}
		if ('number' === typeof arg) {
			result[arg] = true;
		} else if ('string' === typeof arg) {
			arg = arg.split(SPACE);
			if (arg.length === 1) {
				result[arg[0]] = true;
			} else if (arg.length) {
				for (var i = 0; i < arg.length; i++) {
					result[arg[i]] = true;
				}
			}
		} else if (Array.isArray(arg)) {
			for (var i = 0; i < arg.length; i++) {
				_parse(result, arg[i]);
			}
		} else if ('object' === typeof arg) {
			for (var k in arg) {
				if (arg.hasOwnProperty(k)) {
					result[k] = arg[k];
				}
			}
		}
	}

	function _classNames () {
		var classSet = {};
		var classes = '';
		for (var i = 0, arg = arguments[i]; i < arguments.length; arg = arguments[++i]) {
			_parse(classSet, arg);
		}
		for (var k in classSet) {
			if (classSet.hasOwnProperty(k) && classSet[k]) {
				classes += ' ' + k;
			}
		}
		return classes.substr(1);
	}

	return _classNames;

})();

// safely export classNames for node / browserify
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}

// safely export classNames for RequireJS
if (typeof define !== 'undefined' && define.amd) {
	define('classNames', [], function() {
		return classNames;
	});
}
