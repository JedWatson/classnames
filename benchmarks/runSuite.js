import benchmark from 'benchmark';
import _ from 'lodash';

const { Suite } = benchmark.runInContext({ _ });

function runSuite (local, npm, dedupe, npmDedupe, fixture, log) {
	const suite = new Suite();

	suite.add(`local#${fixture.description}`, () => {
		local(...fixture.args);
	});

	suite.add(`  npm#${fixture.description}`, () => {
		npm(...fixture.args);
	});

	suite.add(`local/dedupe#${fixture.description}`, () => {
		dedupe(...fixture.args);
	});

	suite.add(`  npm/dedupe#${fixture.description}`, () => {
		npmDedupe(...fixture.args);
	});

	suite.on('cycle', (event) => {
		log(`* ${event.target}`);
	});

	suite.on('complete', () => {
		log(`\n> Fastest is ${(suite.filter('fastest').map(result => result.name).join(' | ')).replace(/\s+/, ' ')}\n`);
	});

	suite.on('error', (event) => {
		log(event.target.error.message);
		throw event.target.error;
	});

	suite.run();
}

export default runSuite;
