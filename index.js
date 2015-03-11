function classNames_recur(arg, classes) {
	for (var i = 0; i < arg.length; i++) {
		var result = classNames(arg[i]);
		if (result) classes.push(result);
	}
}

function classNames() {
	var args = arguments;
	var classes = [];

	for (var i = 0; i < args.length; i++) {
		var arg = args[i];
		if (!arg) {
			continue;
		}
		if ('string' === typeof arg || 'number' === typeof arg) {
			classes.push(arg);
		} else if (arg.constructor === Array) {
			classNames_recur(arg, classes);
		} else if ('object' === typeof arg) {
			for (var key in arg) {
				if (arg.hasOwnProperty(key) && arg[key]) {
					classes.push(key);
				}
			}
		}
	}
	return classes.join(' ');
}

// safely export classNames in case the script is included directly on a page
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}
