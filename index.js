/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classArray(){
	  var classes = [];
	  var i = -1;
	  while ( ++i < arguments.length) {
	   var arg = arguments[i];
	   if (!arg) continue;
	   var argType = typeof arg;

	    if (argType === 'string') {
	      classes = classes.concat(arg.split(' '));
	    } else if (argType === 'number') {
	      classes.push(arg);
	    } else if (Array.isArray(arg)) {
	      var c = classArray.apply(null, arg);
	      var j = -1;
	      while(++j < c.length){
	        if(classes.indexOf(c[j]) === -1){
	          classes.push(c[j]);
	        }
	      }
	    } else if (argType === 'object') {
	      for (var key in arg) {
	        if (hasOwn.call(arg, key)) {
	          var index = classes.indexOf(key);
	          if (arg[key]) {
	            if(index === -1){
	              classes.push(key);
	            }
	          } else if (index > -1) {
	            classes.splice(index, 1);
	          }
	        }
	      }
	    }
	  }
	  return classes;
	}

	function classNames() {
	  return classArray.apply(null, arguments).join(' ');
	}


	module.exports = classNames;


	if (typeof module !== 'undefined' && module.exports) {
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
