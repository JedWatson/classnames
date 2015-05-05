var fixtures = [
	{
		description: "strings",
		args: ["one", "two", "three"],
		expected: "one two three"
	},
	{
		description: "object",
		args: [{ one: true, two: true, three: false }],
		expected: "one two"
	},
	{
		description: "mix",
		args: ["one", { two: true, three: false }, { four: 'four', five: true }, 6, {}],
		expected: "one two four five 6"
	},
	{
		description: "arrays",
		args: [["one", "two"], ["three"], ["four", ["five"]], [{ six: true }, { seven: false }]],
		expected: "one two three four five six"
	}
];

var local = require("../");
var dedupe = require("../dedupe");
var localPackage = require('../package.json');

try {
	var npm = require("classnames");
	var npmDedupe = require("classnames/dedupe");
	var npmPackage = require('./node_modules/classnames/package.json');
} catch(e) {
	console.log("There was an error loading the benchmark classnames package.\n" +
		"Please make sure you have run `npm install` in ./benchmarks\n");
	process.exit(0);
}

if (localPackage.version !== npmPackage.version) {
	console.log("Your local version (" + localPackage.version + ") does not match the installed version (" + npmPackage.version + ")\n\n" +
		"Please run `npm update` in ./benchmarks to ensure you are benchmarking\n" +
		"the latest version of this package.\n");
	process.exit(0);
}

var assert = require("assert");
var benchmark = require("benchmark");

function sortClasses(str) {
	var sorted = str.split(' ').sort();
	return sorted.join(' ');
}

fixtures.forEach(function(f) {
	// sort assertions because dedupe returns results in a different order
	assert.equal(sortClasses(local.apply(null, f.args)), sortClasses(f.expected));
	assert.equal(sortClasses(dedupe.apply(null, f.args)), sortClasses(f.expected));
	assert.equal(sortClasses(npm.apply(null, f.args)), sortClasses(f.expected));
	assert.equal(sortClasses(npmDedupe.apply(null, f.args)), sortClasses(f.expected));

	var suite = new benchmark.Suite();

	suite.add("local#" + f.description, function() {
		local.apply(null, f.args);
	});

	suite.add("  npm#" + f.description, function() {
		npm.apply(null, f.args);
	});

	suite.add("local/dedupe#" + f.description, function() {
		dedupe.apply(null, f.args);
	});

	suite.add("  npm/dedupe#" + f.description, function() {
		npmDedupe.apply(null, f.args);
	});

	// after each cycle
	suite.on("cycle", function (event) {
		console.log("*", String(event.target));
	});

	// other handling
	suite.on("complete", function() {
		console.log("\n> Fastest is" + (" " + this.filter("fastest").pluck("name").join(' | ')).replace(/\s+/, ' ') + '\n');
	});

	suite.on("error", function(event) {
		throw event.target.error;
	});

	suite.run();
})
