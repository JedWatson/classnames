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

	function classNames()
	{
		var len = arguments.length;

		if (!len){
			return "";
		}

		var str = "", item, i, n;
		for (i = 0; i < len; i++) {
			if (!(item = arguments[i])) {
				continue;
			}

			if (typeof item === "string" || typeof item === "number") {
				str && (str += " ");
				(str += this && this[item] || item);
				continue;
			}

			if (typeof item !== "object")
				continue;

			if (isArray(item)) {
				if ((item = classNames.apply(this, item))){
					str && (str += " ");
					(str += item);
				}

				continue;
			}

			for (n in item) {
				if (hasOwnProperty.call(item, n) && item[n] && n){
					str && (str += " ");
					(str += this && this[n] || n);
				}
			}
		}

		return str;
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	}
	else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	}
	else {
		window.classNames = classNames;
	}
}());
