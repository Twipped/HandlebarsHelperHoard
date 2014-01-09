
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{sort a }}',
		input: {a:[1,2,3]},
		output: '1,2,3'
	},
	{
		template: '{{sort a}}',
		input: {a:[3,2,1]},
		output: '1,2,3'
	},
	{
		template: '{{sort a}}',
		input: {a:[]},
		output: ''
	},
	{
		template: '{{#sort a "a"}}|{{#each this}}{{@key}}:{{this}},{{/each}}|{{else}}no{{/sort}}',
		input: {a:[{a:4}, {a:3}, {b:1}]},
		output: '|a:3,||a:4,||b:1,|'
	},
	{
		template: '{{#sort a}}|{{this}}|{{else}}no{{/sort}}',
		input: {a:[]},
		output: 'no'
	}
]);