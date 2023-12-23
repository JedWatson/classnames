import local from 'classnames-local';
import dedupe from 'classnames-local/dedupe.js';
import localPackage from 'classnames-local/package.json' with { type: 'json' };

import npm from 'classnames-npm';
import npmDedupe from 'classnames-npm/dedupe.js';
import npmPackage from 'classnames-npm/package.json' with { type: 'json' };

import fixtures from './fixtures.js';
import runChecks from './runChecks.js';
import runSuite from './runSuite.js';

if (localPackage.version !== npmPackage.version) {
	log(
		`Your local version (${localPackage.version} does not match the installed version (${npmPackage.version})\n\n` +
		'Please run `npm update classnames-npm` in ./benchmarks to ensure you are benchmarking\n' +
		'the latest version of this package.\n'
	);
	process.exit(0);
}

fixtures.forEach((f) => {
	runChecks(local, npm, dedupe, npmDedupe, f);
	runSuite(local, npm, dedupe, npmDedupe, f, log);
});

function log (message) {
	console.log(message);
}
