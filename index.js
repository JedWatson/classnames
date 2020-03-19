/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var prefixCls = '';
	var prefixSep = '-'; 

	function classNames() {
		var classes = [];
		console.log(arguments);
		var argClasses = arguments && arguments.classes;
		var argCls = arguments && arguments.prefixCls;
		var argSep = hasOwn.call('prefixSep') ? arguments.prefixSep : prefixSep;
		if(argCls) {
			prefixCls = `${argCls}${argSep}`
		}
		for (var i = 0; i < argClasses.length; i++) {
			var arg = argClasses[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(`${prefixCls}${arg}`);
			} else if (Array.isArray(arg)) {
				if(arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(`${prefixCls}${inner}`);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString) {
					classes.push(`${prefixCls}${arg.toString()}`);
				} else {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(`${prefixCls}${key}`);
						}
					}
				}
			}
		}

		return classes.join(' ');
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
