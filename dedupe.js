/*!
 Copyright (c) 2018 Jed Watson.
 Licensed under the MIT License (MIT), see
 http://jedwatson.github.io/classnames
 */
/* global define */

(function () {
	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var isArray = Array.isArray;
	var SPACE = /\s+/;
	
	// don't inherit from Object so we can skip hasOwnProperty check later
	// http://stackoverflow.com/questions/15518328/creating-js-object-with-object-createnull#answer-21079232
	function StorageObject() {}
	StorageObject.prototype = Object.create(null);

	function _parse (resultSet, arg) {
		if (!arg) return;
		
		var i, length;
		
		if (typeof arg === 'string') { // 'foo bar'
			var array = arg.split(SPACE);
			length = array.length;

			for (i = 0; i < length; ++i) {
				resultSet[array[i]] = true;
			}
		} else if (isArray(arg)) { // ['foo', 'bar', ...]
			length = arg.length;

			for (i = 0; i < length; ++i) {
				_parse(resultSet, arg[i]);
			}
		} else if (typeof arg === 'object') { // { 'foo': true, ... }
			for (i in arg) {
				if (hasOwn.call(arg, i)) {
					// set value to false instead of deleting it to avoid changing object structure
					// https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/#de-referencing-misconceptions
					resultSet[i] = !!arg[i];
				}
			}
		} else if (typeof arg === 'number') { // '130'
			resultSet[arg] = true;
		}
	}
	
	function classNames(){
		var classSet = new StorageObject();

		var str = '', n,
			len = arguments.length;

		for (n = 0; n < len; n++) {
			_parse(classSet, arguments[n]);
		}

		for (n in classSet) {
			if (classSet[n]) {
				str && (str += ' '), (str += n);
			}
		}

		return str;
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());
