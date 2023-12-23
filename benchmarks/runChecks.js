import assert from 'node:assert/strict';

function sortClasses (str) {
	return str.split(' ').sort().join(' ');
}

function runChecks (local, npm, dedupe, npmDedupe, fixture) {
	// Sort assertions because 'dedupe' returns results in a different order.
	assert.equal(sortClasses(local(...fixture.args)), sortClasses(fixture.expected));
	assert.equal(sortClasses(dedupe(...fixture.args)), sortClasses(fixture.expected));
	assert.equal(sortClasses(npm(...fixture.args)), sortClasses(fixture.expected));
	assert.equal(sortClasses(npmDedupe(...fixture.args)), sortClasses(fixture.expected));
}

export default runChecks;
