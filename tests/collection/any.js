
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{any a }}',
		input: {a:[0]},
		output: ''
	},
	{
		template: '{{any a }}',
		input: {a:[0, 0]},
		output: ''
	},
	{
		template: '{{any a }}',
		input: {a:[0, 1]},
		output: 'true'
	},
	{
		template: '{{any a }}',
		input: {a:[1, 2]},
		output: 'true'
	},
	{
		template: '{{any a }}',
		input: {a:{}},
		output: ''
	},
	{
		template: '{{any a }}',
		input: {a:{a:true}},
		output: 'true'
	},

	{
		template: '{{#any a }}yes{{else}}no{{/any}}',
		input: {a:[0]},
		output: 'no'
	},
	{
		template: '{{#any a }}yes{{else}}no{{/any}}',
		input: {a:[0, 0]},
		output: 'no'
	},
	{
		template: '{{#any a }}yes{{else}}no{{/any}}',
		input: {a:[0, 1]},
		output: 'yes'
	},
	{
		template: '{{#any a }}yes{{else}}no{{/any}}',
		input: {a:[1, 2]},
		output: 'yes'
	},
	{
		template: '{{#any a }}yes{{else}}no{{/any}}',
		input: {a:{}},
		output: 'no'
	},
	{
		template: '{{#any a }}yes{{else}}no{{/any}}',
		input: {a:{a:true}},
		output: 'yes'
	},

]);