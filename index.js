var hasOwn = {}.hasOwnProperty;

export default function classNames () {
	var classes = '';

	for (var i = 0; i < arguments.length; i++) {
		var arg = arguments[i];
		if (arg) {
			classes = appendClass(classes, parseValue(arg));
		}
	}

	return classes;
}

function parseValue (arg) {
	if (typeof arg === 'string' || typeof arg === 'number') {
		return arg;
	}

	if (typeof arg !== 'object') {
		return '';
	}

	if (Array.isArray(arg)) {
		return classNames.apply(null, arg);
	}

	if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
		return arg.toString();
	}

	var classes = '';

	for (var key in arg) {
		if (hasOwn.call(arg, key) && arg[key]) {
			classes = appendClass(classes, key);
		}
	}

	return classes;
}

function appendClass (value, newClass) {
	if (!newClass) {
		return value;
	}

	if (value) {
		return value + ' ' + newClass;
	}

	return value + newClass;
}
