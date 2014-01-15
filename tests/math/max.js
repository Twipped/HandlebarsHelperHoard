
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{max a b c d}}',
		input: {a:[1,2,3], b:4, c:5, d:6},
		output: '6'
	},
	{
		template: '{{max a b}}',
		input: {a:[1,2,3], b:0},
		output: '3'
	},
	{
		template: '{{max a}}',
		input: {a:[-1,0,3]},
		output: '3'
	}
]);