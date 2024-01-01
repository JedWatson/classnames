const hasOwn = {}.hasOwnProperty;

export default function classNames () {
	const classes = new Set();

	for (let i = 0; i < arguments.length; i++) {
		appendValue(classes, arguments[i]);
	}

	return Array.from(classes.values()).join(' ');
}

function appendValue (classes, value) {
	if (!value) {
		return;
	}

	const type = typeof value;

	if (type === 'string') {
		appendString(classes, value);
	} else if (Array.isArray(value)) {
		appendArray(classes, value);
	} else if (type === 'object') {
		appendObject(classes, value);
	} else if (type === 'number') {
		classes.add(value);
	}
}

const SPACE = /\s+/;

function appendString (classes, value) {
	const entries = value.split(SPACE);

	for (let entry of entries) {
		classes.add(entry);
	}
}

function appendArray (classes, values) {
	for (const value of values) {
		appendValue(classes, value);
	}
}

function appendObject (classes, value) {
	if (
		value.toString !== Object.prototype.toString &&
		!value.toString.toString().includes('[native code]')
	) {
		classes.add(value.toString());
		return;
	}

	for (const key in value) {
		if (!hasOwn.call(value, key)) {
			continue;
		}

		if (value[key]) {
			classes.add(key);
		} else {
			classes.delete(key);
		}
	}
}
