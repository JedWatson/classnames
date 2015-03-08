function classNames() {
	var args = arguments;
	var classes = [];

	for (var i = 0; i < args.length; i++) {
		checkArg(args[i]);
	}
	return classes.join(' ');

	function checkArg(arg) {
		if (!arg) {
			return;
		}

		var x;
		switch (Object.prototype.toString.call(arg).match(/(\w+)\]/)[1]) {
			case 'String':
			case 'Number':
				classes.push(arg);
				break;
			case 'Array':
				for (x = 0; x < arg.length; x++) {
					checkArg(arg[x]);
				}
				break;
			case 'Object':
				for (x in arg) {
					if (arg.hasOwnProperty(x) && arg[x]) {
						classes.push(x);
					}
				}
				break;
		}
	}
}

// safely export classNames in case the script is included directly on a page
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}
