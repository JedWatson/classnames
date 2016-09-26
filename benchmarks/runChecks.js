var assert = require('assert');

function sortClasses (str) {
	return str.split(' ').sort().join(' ');
}

function runChecks (local, npm, dedupe, npmDedupe, fixture) {
	// sort assertions because dedupe returns results in a different order
	assert.equal(sortClasses(local.apply(null, fixture.args)), sortClasses(fixture.expected));
	assert.equal(sortClasses(dedupe.apply(null, fixture.args)), sortClasses(fixture.expected));
	assert.equal(sortClasses(npm.apply(null, fixture.args)), sortClasses(fixture.expected));
	assert.equal(sortClasses(npmDedupe.apply(null, fixture.args)), sortClasses(fixture.expected));
}

module.exports = runChecks;
