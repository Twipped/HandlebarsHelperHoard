
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{empty a }}',
		input: {a:1},
		output: ''
	},
	{
		template: '{{empty a }}',
		input: {a:''},
		output: 'true'
	},
	{
		template: '{{empty a }}',
		input: {a:[]},
		output: 'true'
	},
	{
		template: '{{empty a }}',
		input: {a:{}},
		output: 'true'
	},
	{
		template: '{{empty a }}',
		input: {a:[0]},
		output: ''
	},
	{
		template: '{{empty a }}',
		input: {a:[1]},
		output: ''
	},
	{
		template: '{{empty a }}',
		input: {a:{a:0}},
		output: ''
	},
	{
		template: '{{empty a }}',
		input: {a:{a:1}},
		output: ''
	},

	{
		template: '{{#empty a }}yes{{else}}no{{/empty}}',
		input: {a:1},
		output: 'no'
	},
	{
		template: '{{#empty a }}yes{{else}}no{{/empty}}',
		input: {a:''},
		output: 'yes'
	}
]);