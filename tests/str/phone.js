
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{phone a}}',
		input: {a:1},
		output: '1'
	},
	{
		template: '{{phone a}}',
		input: {a:1234567},
		output: '1234567'
	},
	{
		template: '{{phone a}}',
		input: {a:1234567890},
		output: '(123) 456-7890'
	},
	{
		template: '{{phone a}}',
		input: {a:123456789012},
		output: '12 (345) 678-9012'
	}
]);
