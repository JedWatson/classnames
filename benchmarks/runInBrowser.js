import local from 'classnames-local';
import dedupe from 'classnames-local/dedupe.js';
import localPackage from 'classnames-local/package.json' with { type: 'json' };

import npm from 'classnames-npm';
import npmDedupe from 'classnames-npm/dedupe.js';
import npmPackage from 'classnames-npm/package.json' with { type: 'json' };

import fixtures from './fixtures.js';
import runSuite from './runSuite.js';

const startButton = document.getElementById('start');
const results = document.getElementById('results');

startButton.addEventListener('click', runBenchmarks);

if (localPackage.version === npmPackage.version) {
	startButton.disabled = false;
} else {
	startButton.style.display = 'none';

	log(
		`Your local version (${localPackage.version} does not match the installed version (${npmPackage.version})\n\n` +
		'Please run `npm update classnames-npm` in ./benchmarks to ensure you are benchmarking\n' +
		'the latest version of this package.\n'
	);
}

async function runBenchmarks () {
	startButton.style.display = 'none';

	log('Running benchmark…');
	log(navigator.userAgent);

	await nextTick();

	for (const fixture of fixtures) {
		runSuite(local, npm, dedupe, npmDedupe, fixture, log);
		await nextTick();
	}

	log('Finished!');
}

function log (message) {
	console.log(message);
	results.textContent += `${message}\n`;
}

function nextTick () {
	return new Promise((resolve) => setTimeout(resolve));
}
