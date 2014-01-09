
var makeTests = require('../testBuilder.js');


module.exports = makeTests([
	{
		template: '{{after a }}',
		input: {a:[1,2,3,4,5]},
		output: '1,2,3,4,5'
	},
	{
		template: '{{after a 2}}',
		input: {a:[1,2,3,4,5]},
		output: '3,4,5'
	},
	{
		template: '{{after a 6}}',
		input: {a:[1,2,3,4,5]},
		output: ''
	},
	{
		template: '{{#after a }}|{{this}}|{{/after}}',
		input: {a:[1,2,3,4,5]},
		output: '|1||2||3||4||5|'
	},
	{
		template: '{{#after a 2}}|{{this}}|{{/after}}',
		input: {a:[1,2,3,4,5]},
		output: '|3||4||5|'
	},
	{
		template: '{{#after a 6}}|{{this}}|{{/after}}',
		input: {a:[1,2,3,4,5]},
		output: ''
	},
]);