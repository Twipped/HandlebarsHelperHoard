
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{add a b c d}}',
		input: {a:[1,2,3], b:4, c:5, d:6},
		output: '21'
	},
	{
		template: '{{add a b}}',
		input: {a:[1,2,3], b:0},
		output: '6'
	},
	{
		template: '{{add a}}',
		input: {a:[1,2,3]},
		output: '6'
	}
]);