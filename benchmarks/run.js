var assert = require("assert");
var benchmark = require("benchmark");

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
var npm = require("classnames");

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
