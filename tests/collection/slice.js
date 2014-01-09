
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{slice a }}',
		input: {a:[1,2,3]},
		output: '1,2,3'
	},
	{
		template: '{{slice a 1}}',
		input: {a:[3,2,1]},
		output: '2,1'
	},
	{
		template: '{{slice a 1 2}}',
		input: {a:[3,2,1]},
		output: '2'
	},
	{
		template: '{{slice a 0 1}}',
		input: {a:[3,2,1]},
		output: '3'
	},
	{
		template: '{{slice a -1}}',
		input: {a:[3,2,1]},
		output: '1'
	},
	{
		template: '{{#slice a 1}}|{{this}}|{{else}}no{{/slice}}',
		input: {a:[3,2,1]},
		output: '|2||1|'
	},
	{
		template: '{{#slice a 1}}|{{this}}|{{else}}no{{/slice}}',
		input: {a:[]},
		output: 'no'
	}
]);