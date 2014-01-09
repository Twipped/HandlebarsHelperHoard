
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{first a }}',
		input: {a:[3,2,1]},
		output: '3'
	},
	{
		template: '{{first a 2}}',
		input: {a:[3,2,1]},
		output: '3,2'
	},
	{
		template: '{{#first a 2}}|{{this}}|{{else}}no{{/first}}',
		input: {a:[3,2,1]},
		output: '|3||2|'
	},
	{
		template: '{{#first a 2}}|{{this}}|{{else}}no{{/first}}',
		input: {a:[]},
		output: 'no'
	}
]);