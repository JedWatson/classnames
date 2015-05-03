var fixtures = [
	{
		description: "strings",
		args: ["foo", "bar", "baz"],
		expected: "foo bar baz"
	},
	{
		description: "object",
		args: [{ foo: true, bar: true, baz: false }],
		expected: "foo bar"
	},
	{
		description: "mix",
		args: ["foo", { bar: true, baz: false }],
		expected: "foo bar"
	}
];

var local = require("../");
var localPackage = require('../package.json');

try {
var npm = require("classnames");
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


fixtures.forEach(function(f) {
	assert.equal(local.apply(null, f.args), f.expected);
	assert.equal(npm.apply(null, f.args), f.expected);

	var suite = new benchmark.Suite();

	suite.add("local#" + f.description, function() {
		local.apply(null, f.args);
	});

	suite.add("npm#" + f.description, function() {
		npm.apply(null, f.args);
	});

	// after each cycle
	suite.on("cycle", function (event) {
		console.log("*", String(event.target));
	});

	// other handling
	suite.on("complete", function() {
		console.log("\n> Fastest is " + this.filter("fastest").pluck("name") + '\n');
	});

	suite.on("error", function(event) {
		throw event.target.error;
	});

	suite.run();
})
