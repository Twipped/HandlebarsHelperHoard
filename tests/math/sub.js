
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{sub a b c d}}',
		input: {a:[1,2,3], b:4, c:5, d:6},
		output: '-19'
	},
	{
		template: '{{sub a b}}',
		input: {a:[1,2,3], b:0},
		output: '-4'
	},
	{
		template: '{{sub a}}',
		input: {a:[1,2,3]},
		output: '-4'
	},
	{
		template: '{{sub a b}}',
		input: {a:10, b:2},
		output: '8'
	}
]);