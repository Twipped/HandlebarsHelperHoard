
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{humanNumber a}}',
		input: {a:1},
		output: '1'
	},
	{
		template: '{{humanNumber a}}',
		input: {a:2},
		output: '2'
	},
	{
		template: '{{humanNumber a}}',
		input: {a:200},
		output: '200'
	},
	{
		template: '{{humanNumber a}}',
		input: {a:2000},
		output: '2k'
	},
	{
		template: '{{humanNumber a}}',
		input: {a:2050},
		output: '2.05k'
	},
	{
		template: '{{humanNumber a}}',
		input: {a:20500},
		output: '20.5k'
	},
	{
		template: '{{humanNumber a}}',
		input: {a:2050000},
		output: '2.05m'
	},
	{
		template: '{{humanNumber a}}',
		input: {a:20500},
		output: '20.5k'
	},
	{
		template: '{{humanNumber a}}',
		input: {a:2050000000000000},
		output: '2050t'
	},
]);
