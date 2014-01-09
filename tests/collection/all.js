
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{all a }}',
		input: {a:[0]},
		output: ''
	},
	{
		template: '{{all a }}',
		input: {a:[0, 0]},
		output: ''
	},
	{
		template: '{{all a }}',
		input: {a:[0, 1]},
		output: ''
	},
	{
		template: '{{all a }}',
		input: {a:[1, 2]},
		output: 'true'
	},
	{
		template: '{{all a }}',
		input: {a:{}},
		output: ''
	},
	{
		template: '{{all a }}',
		input: {a:{a:true}},
		output: 'true'
	},
	{
		template: '{{all a }}',
		input: {a:{a:true, b: false}},
		output: ''
	},

	{
		template: '{{#all a }}yes{{else}}no{{/all}}',
		input: {a:[0]},
		output: 'no'
	},
	{
		template: '{{#all a }}yes{{else}}no{{/all}}',
		input: {a:[0, 0]},
		output: 'no'
	},
	{
		template: '{{#all a }}yes{{else}}no{{/all}}',
		input: {a:[0, 1]},
		output: 'no'
	},
	{
		template: '{{#all a }}yes{{else}}no{{/all}}',
		input: {a:[1, 2]},
		output: 'yes'
	},
	{
		template: '{{#all a }}yes{{else}}no{{/all}}',
		input: {a:{}},
		output: 'no'
	},
	{
		template: '{{#all a }}yes{{else}}no{{/all}}',
		input: {a:{a:true}},
		output: 'yes'
	},

]);