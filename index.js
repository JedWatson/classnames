function classNames() {
	var args = arguments, classes = [];
	for (var i = 0; i < args.length; i++) {
		var arg = args[i];
		if (arg == null) {
			continue;
		}

		if ('string' === typeof arg) {
			classes.push(arg);
		} else if ('object' === typeof arg) {
			classes = classes.concat(Object.keys(arg).filter(function(cls) {
				return arg[cls];
			}));
		}
	}
	return classes.join(' ') || '';
}

module.exports = classNames;
