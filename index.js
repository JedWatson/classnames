function classNames() {
	var classes = {};
	var arg;
  var str = "";

	for (var i = 0; i < arguments.length; i++) {
    parseArg(arguments[i]);
  }

  function parseArg(arg) {
		if (!arg) {
			return;
		}

		if ('string' === typeof arg || 'number' === typeof arg) {
			classes[arg] = true;
		} else if (Object.prototype.toString.call(arg) === '[object Array]') {
			arg.forEach(parseArg);
		} else if ('object' === typeof arg) {
			for (var key in arg) {
				if (arg.hasOwnProperty(key)) {
          classes[key] = !!arg[key];
				}
			}
		}
	}

  for (var key in classes) {
    if (classes.hasOwnProperty(key) && classes[key]) {
      str = str + " " + key;
    }
  }

  return str.substring(1);

}

// safely export classNames in case the script is included directly on a page
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}
