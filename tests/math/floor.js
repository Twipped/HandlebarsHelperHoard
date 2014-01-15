
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{floor a}}',
		input: {a:1},
		output: '1'
	},
	{
		template: '{{floor a}}',
		input: {a:0},
		output: '0'
	},
	{
		template: '{{floor a}}',
		input: {a:0.1},
		output: '0'
	},
	{
		template: '{{floor a}}',
		input: {a:0.55},
		output: '0'
	},
	{
		template: '{{floor a}}',
		input: {a:5.6},
		output: '5'
	}
]);