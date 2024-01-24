// Don't inherit from Object so we can skip hasOwnProperty check later.
function StorageObject () {}
StorageObject.prototype = Object.create(null);

export default function classNames () {
	const classSet = new StorageObject();
	appendArray(classSet, arguments);

	let classes = '';

	for (const key in classSet) {
		if (classSet[key]) {
			classes += classes ? (' ' +  key) : key;
		}
	}

	return classes;
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
