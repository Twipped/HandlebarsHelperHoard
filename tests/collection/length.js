
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{length a }}',
		input: {a:[1,2,3]},
		output: '3'
	},
	{
		template: '{{length a }}',
		input: {a:[]},
		output: '0'
	},
	{
		template: '{{#length a}}yes{{else}}no{{/length}}',
		input: {a:[3,2,1]},
		output: 'yes'
	},
	{
		template: '{{#length a}}yes{{else}}no{{/length}}',
		input: {a:[]},
		output: 'no'
	},

	{
		template: '{{length a 3}}',
		input: {a:[1,2,3]},
		output: '3'
	},
	{
		template: '{{length a 3}}',
		input: {a:[]},
		output: '0'
	},
	{
		template: '{{#length a 3}}yes{{else}}no{{/length}}',
		input: {a:[3,2,1]},
		output: 'yes'
	},
	{
		template: '{{#length a 3}}yes{{else}}no{{/length}}',
		input: {a:[]},
		output: 'no'
	}
]);