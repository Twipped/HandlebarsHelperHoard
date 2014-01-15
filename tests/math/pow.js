
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{pow a b}}',
		input: {a:10, b:4},
		output: '10000'
	},
	{
		template: '{{pow a b}}',
		input: {a:6, b:0},
		output: '1'
	},
	{
		template: '{{pow a b}}',
		input: {a:6, b:1},
		output: '6'
	}
]);