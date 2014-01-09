
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{notEmpty a }}',
		input: {a:1},
		output: 'true'
	},
	{
		template: '{{notEmpty a }}',
		input: {a:''},
		output: ''
	},
	{
		template: '{{notEmpty a }}',
		input: {a:[]},
		output: ''
	},
	{
		template: '{{notEmpty a }}',
		input: {a:{}},
		output: ''
	},
	{
		template: '{{notEmpty a }}',
		input: {a:[0]},
		output: 'true'
	},
	{
		template: '{{notEmpty a }}',
		input: {a:[1]},
		output: 'true'
	},
	{
		template: '{{notEmpty a }}',
		input: {a:{a:0}},
		output: 'true'
	},
	{
		template: '{{notEmpty a }}',
		input: {a:{a:1}},
		output: 'true'
	},

	{
		template: '{{#notEmpty a }}yes{{else}}no{{/notEmpty}}',
		input: {a:1},
		output: 'yes'
	},
	{
		template: '{{#notEmpty a }}yes{{else}}no{{/notEmpty}}',
		input: {a:''},
		output: 'no'
	}
]);