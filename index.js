function classNames() {
	var args = arguments;
	var classes = [];

	for (var i = 0; i < args.length; i++) {
		var arg = args[i];
		if (arg == null) {
			continue;
		}

		if ('string' === typeof arg) {
			classes.push(arg);
		} else if ('object' === typeof arg) {
			for (var key in arg) {
				if (!arg.hasOwnProperty(key) || !arg[key]) {
					continue;
				}
				classes.push(key);
			}
		}
	}
	return classes.join(' ');
}

module.exports = classNames;
