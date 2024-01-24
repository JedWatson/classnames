import { Bench } from 'tinybench';
import { markdownTable } from 'markdown-table';

import local from 'classnames-local';
import bind from 'classnames-local/bind.js';
import dedupe from 'classnames-local/dedupe.js';
import localPackage from 'classnames-local/package.json' with { type: 'json' };

import npm from 'classnames-npm';
import npmDedupe from 'classnames-npm/dedupe.js';
import npmBind from 'classnames-npm/bind.js';
import npmPackage from 'classnames-npm/package.json' with { type: 'json' };

if (localPackage.version !== npmPackage.version) {
	console.warn(
		`Your local version (${localPackage.version}) does not match the installed version (${npmPackage.version}).\n\n` +
		'Please run `npm update classnames-npm` to ensure you are benchmarking against the latest version published to NPM.\n'
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
		args: ['one', {two: true, three: false}, {four: 'four', five: true}, {}]
	},
	{
		description: 'arrays',
		args: [['one', 'two'], ['three'], ['four', ['five']], [{six: true}, {seven: false}]]
	}
];

export async function runBenchmarks () {
	for (const benchmark of benchmarks) {
		console.log(`Benchmarking '${benchmark.description}'.\n`);
		const bench = await runBenchmark(benchmark);
		printTable(bench);
	}
	
	console.log('Finished!');
}

async function runBenchmark (benchmark) {
	const bench = new Bench();

	bench.add('default/local', () => local(...benchmark.args));
	bench.add('default/npm', () => npm(...benchmark.args));

	bench.add('bind/local', () => bind(...benchmark.args));
	bench.add('bind/npm', () => npmBind(...benchmark.args));

	bench.add('dedupe/local', () => dedupe(...benchmark.args));
	bench.add('dedupe/npm', () => npmDedupe(...benchmark.args));

	await bench.run();
	return bench;
}

function printTable(bench) {
	const table = bench.table();
	const headers = Object.keys(table[0]);
	const data = table.map((entry) => headers.map((header) => entry[header]));

	console.log(markdownTable([headers, ...data]) + '\n');
}
