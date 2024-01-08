// Don't inherit from Object so we can skip hasOwnProperty check later.
function StorageObject () {}
StorageObject.prototype = Object.create(null);

export default function classNames () {
	// Don't leak arguments.
	// https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
	const length = arguments.length;
	const args = Array(length);

	for (let i = 0; i < length; i++) {
		args[i] = arguments[i];
	}

	const classSet = new StorageObject();
	appendArray(classSet, args);

	const list = [];

	for (const k in classSet) {
		if (classSet[k]) {
			list.push(k);
		}
	}

	return list.join(' ');
}

function appendValue (classSet, arg) {
	if (!arg) return;
	const argType = typeof arg;

	if (argType === 'string') {
		appendString(classSet, arg);
	} else if (Array.isArray(arg)) {
		appendArray(classSet, arg);
	} else if (argType === 'object') {
		appendObject(classSet, arg);
	} else if (argType === 'number') {
		appendNumber(classSet, arg);
	}
}

const SPACE = /\s+/;

function appendString (classSet, str) {
	const array = str.split(SPACE);
	const length = array.length;

	for (let i = 0; i < length; i++) {
		classSet[array[i]] = true;
	}
}

function appendArray (classSet, array) {
	const length = array.length;

	for (let i = 0; i < length; i++) {
		appendValue(classSet, array[i]);
	}
}

function appendNumber (classSet, num) {
	classSet[num] = true;
}

const hasOwn = {}.hasOwnProperty;

function appendObject (classSet, object) {
	if (
		object.toString !== Object.prototype.toString &&
		!object.toString.toString().includes('[native code]')
	) {
		classSet[object.toString()] = true;
		return;
	}

	for (const k in object) {
		if (hasOwn.call(object, k)) {
			// Set value to false instead of deleting it to avoid changing object structure.
			// https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/#de-referencing-misconceptions
			classSet[k] = !!object[k];
		}
	}
}
