import { strictEqual } from 'node:assert';

function sortClasses (str) {
	return str.split(' ').sort().join(' ');
}

export default function runChecks (local, npm, dedupe, npmDedupe, fixture) {
	// sort assertions because dedupe returns results in a different order
	strictEqual(sortClasses(local.apply(null, fixture.args)), sortClasses(fixture.expected));
	strictEqual(sortClasses(dedupe.apply(null, fixture.args)), sortClasses(fixture.expected));
	strictEqual(sortClasses(npm.apply(null, fixture.args)), sortClasses(fixture.expected));
	strictEqual(sortClasses(npmDedupe.apply(null, fixture.args)), sortClasses(fixture.expected));
}
