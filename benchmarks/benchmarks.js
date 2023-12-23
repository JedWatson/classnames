import { Bench } from 'tinybench';

import local from 'classnames-local';
import dedupe from 'classnames-local/dedupe.js';
import localPackage from 'classnames-local/package.json' with { type: 'json' };

import npm from 'classnames-npm';
import npmDedupe from 'classnames-npm/dedupe.js';
import npmPackage from 'classnames-npm/package.json' with { type: 'json' };

if (localPackage.version !== npmPackage.version) {
	console.warn(
		`Your local version (${localPackage.version}) does not match the installed version (${npmPackage.version}).\n\n` +
		'Please run `npm update classnames-npm` in ./benchmarks to ensure you are benchmarking against the latest version published to NPM.\n'
	);
}

const benchmarks = [
	{
		description: 'strings',
		args: ['one', 'two', 'three']
	},
	{
		description: 'object',
		args: [{one: true, two: true, three: false}]
	},
	{
		description: 'strings, object',
		args: ['one', 'two', {four: true, three: false}]
	},
	{
		description: 'mix',
		args: ['one', {two: true, three: false}, {four: 'four', five: true}, 6, {}]
	},
	{
		description: 'arrays',
		args: [['one', 'two'], ['three'], ['four', ['five']], [{six: true}, {seven: false}]]
	}
];

export async function runBenchmarks () {
	for (const benchmark of benchmarks) {
		console.log(`Benchmarking '${benchmark.description}'.`);
		const bench = await runBenchmark(benchmark);
		console.table(bench.table());
	}
	
	console.log('Finished!');
}

async function runBenchmark (benchmark) {
	const bench = new Bench();

	bench.add(`local#${benchmark.description}`, () => {
		local(...benchmark.args);
	});

	bench.add(`npm#${benchmark.description}`, () => {
		npm(...benchmark.args);
	});

	bench.add(`local/dedupe#${benchmark.description}`, () => {
		dedupe(...benchmark.args);
	});

	bench.add(`npm/dedupe#${benchmark.description}`, () => {
		npmDedupe(...benchmark.args);
	});

	await bench.run();
	return bench;
}
