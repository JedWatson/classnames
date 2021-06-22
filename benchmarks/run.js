import { readFile } from 'node:fs/promises'
import fixtures from './fixtures.js';
import local from '../index.js';
import dedupe from '../dedupe.js';

var localPackage = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));

function log (message) {
	console.log(message);
}

try {
	var npm = (await import('classnames')).default;
	// TODO: .js extension can be dropped once a new version has been published.
	var npmDedupe = (await import('classnames/dedupe.js')).default;
	var npmPackage = JSON.parse(await readFile(new URL('./node_modules/classnames/package.json', import.meta.url)));
} catch (e) {
	log('There was an error loading the benchmark classnames package.\n' +
		'Please make sure you have run `npm install` in ./benchmarks\n');
	process.exit(0);
}

if (localPackage.version !== npmPackage.version) {
	log('Your local version (' + localPackage.version + ') does not match the installed version (' + npmPackage.version + ')\n\n' +
		'Please run `npm update` in ./benchmarks to ensure you are benchmarking\n' +
		'the latest version of this package.\n');
	process.exit(0);
}

import runChecks from './runChecks.js';
import runSuite from './runSuite.js';

fixtures.forEach(function (f) {
	runChecks(local, npm, dedupe, npmDedupe, f);
	runSuite(local, npm, dedupe, npmDedupe, f, log);
});
