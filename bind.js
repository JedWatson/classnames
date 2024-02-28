const hasOwn = {}.hasOwnProperty;

export default function classNames () {
	let classes = '';

	for (let i = 0; i < arguments.length; i++) {
		const arg = arguments[i];
		if (arg) {
			classes = appendClass(classes, parseValue.call(this, arg));
		}
	}

	return classes;
}

function parseValue (arg) {
	if (typeof arg === 'string') {
		return this && this[arg] || arg;
	}

	if (typeof arg !== 'object') {
		return '';
	}

	if (Array.isArray(arg)) {
		return classNames.apply(this, arg);
	}

	if (arg instanceof Set) {
		return classNames.apply(this, Array.from(arg));
	}

	if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
		return arg.toString();
	}

	let classes = '';

	if (arg instanceof Map) {
		for (const [key, value] of arg) {
			if (value) {
				if (typeof key === 'symbol') {
					const symbolDescription = key.toString().slice(7, -1);
					classes = appendClass(classes, this && this[symbolDescription] || symbolDescription);
				}

				if (typeof key === 'string') {
					classes = appendClass(classes, this && this[key] || key);			
				}
			}
		}
		return classes;
	}

	for (const key in arg) {
		if (hasOwn.call(arg, key) && arg[key]) {
			classes = appendClass(classes, this && this[key] || key);
		}
	}
	return classes;
}

function appendClass (value, newClass) {
	if (!newClass) {
		return value;
	}

	return value ? (value + ' ' + newClass) : newClass;
}
