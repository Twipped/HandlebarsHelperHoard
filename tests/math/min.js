
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{min a b c d}}',
		input: {a:[1,2,3], b:4, c:5, d:6},
		output: '1'
	},
	{
		template: '{{min a b}}',
		input: {a:[1,2,3], b:0},
		output: '0'
	},
	{
		template: '{{min a}}',
		input: {a:[-1,0,3]},
		output: '-1'
	}
]);