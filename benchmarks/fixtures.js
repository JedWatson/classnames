var fixtures = [
	{
		description: 'strings',
		args: ['one', 'two', 'three'],
		expected: 'one two three'
	},
	{
		description: 'object',
		args: [{one: true, two: true, three: false}],
		expected: 'one two'
	},
	{
		description: 'strings, object',
		args: ['one', 'two', {four: true, three: false}],
		expected: 'one two four'
	},
	{
		description: 'mix',
		args: ['one', {two: true, three: false}, {four: 'four', five: true}, 6, {}],
		expected: 'one two four five 6'
	},
	{
		description: 'arrays',
		args: [['one', 'two'], ['three'], ['four', ['five']], [{six: true}, {seven: false}]],
		expected: 'one two three four five six'
	}
];

module.exports = fixtures;
