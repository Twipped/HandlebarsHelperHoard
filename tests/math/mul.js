
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{mul a b c d}}',
		input: {a:[1,2,3], b:4, c:5, d:6},
		output: '720'
	},
	{
		template: '{{mul a b}}',
		input: {a:[1,2,3], b:0},
		output: '0'
	},
	{
		template: '{{mul a}}',
		input: {a:[1,2,3]},
		output: '6'
	}
]);