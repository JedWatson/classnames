const hasOwn = {}.hasOwnProperty;

export default function classNames() {
	let classes = '';

	for (let i = 0; i < arguments.length; i++) {
		const arg = arguments[i];

		if (!arg) {
			continue;
		}

		if (typeof arg === 'string') {
			classes = appendClass(classes, (this && this[arg]) || arg);
			continue;
		}

		if (typeof arg !== 'object') {
			continue;
		}

		for (const key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, (this && this[key]) || key);
			}
		}
	}

	return classes;
}

function appendClass(value, newClass) {
	if (value) {
		return value + ' ' + newClass;
	}

	return value + newClass;
}
