/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var isArray = Array.isArray;

	function reduceArray (args) {
		var len = args.length;
		if (!len)
			return "";
		var str = "", item, type, i, n;
		for (i = 0; i < len; i++) {
			if (!(item = args[i]))
				continue;
			type = typeof item;
			if (type === "string" || type === "number") {
				str && (str += " "), (str += item);
				continue;
			}
			if (type !== "object")
				continue;
			if (isArray(item)) {
				if (item.length && (item = reduceArray(item))) {
					str && (str += " "), (str += item);
				}
			}
			else {
				for (n in item) {
					if (hasOwnProperty.call(item, n) && item[n] && n) {
						str && (str += " "), (str += n);
					}
				}
			}
		}
		return str;
	}
	
	function classNames() {
		return reduceArray(arguments);
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
