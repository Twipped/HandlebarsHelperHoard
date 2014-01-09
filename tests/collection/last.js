
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{last a }}',
		input: {a:[1,2,3]},
		output: '3'
	},
	{
		template: '{{last a 2}}',
		input: {a:[3,2,1]},
		output: '2,1'
	},
	{
		template: '{{#last a 2}}|{{this}}|{{else}}no{{/last}}',
		input: {a:[3,2,1]},
		output: '|2||1|'
	},
	{
		template: '{{#last a 2}}|{{this}}|{{else}}no{{/last}}',
		input: {a:[]},
		output: 'no'
	}
]);