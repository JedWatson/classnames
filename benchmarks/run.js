var fixtures = require('./fixtures');
var local = require('classnames-local');
var dedupe = require('classnames-local/dedupe');
var localPackage = require('classnames-local/package.json');

function log (message) {
	console.log(message);
}

try {
	var npm = require('classnames-npm');
	var npmDedupe = require('classnames-npm/dedupe');
	var npmPackage = require('classnames-npm/package.json');
} catch (e) {
	log('There was an error loading the benchmark classnames package.\n' +
		'Please make sure you have run `npm install` in ./benchmarks\n');
	process.exit(0);
}

if (localPackage.version !== npmPackage.version) {
	log('Your local version (' + localPackage.version + ') does not match the installed version (' + npmPackage.version + ')\n\n' +
		'Please run `npm update classnames-npm` in ./benchmarks to ensure you are benchmarking\n' +
		'the latest version of this package.\n');
	process.exit(0);
}

var runChecks = require('./runChecks');
var runSuite = require('./runSuite');

fixtures.forEach(function (f) {
	runChecks(local, npm, dedupe, npmDedupe, f);
	runSuite(local, npm, dedupe, npmDedupe, f, log);
});
