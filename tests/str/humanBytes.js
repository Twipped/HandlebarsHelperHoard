
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{humanBytes a}}',
		input: {a:1},
		output: '1 byte'
	},
	{
		template: '{{humanBytes a}}',
		input: {a:-1},
		output: '1 byte'
	},
	{
		template: '{{humanBytes a}}',
		input: {a:2},
		output: '2 bytes'
	},
	{
		template: '{{humanBytes a}}',
		input: {a:1100},
		output: '1.1 KB'
	},
	{
		template: '{{humanBytes a}}',
		input: {a:150001},
		output: '150 KB'
	},
	{
		template: '{{humanBytes a}}',
		input: {a:15000001},
		output: '15 MB'
	},
	{
		template: '{{humanBytes a}}',
		input: {a:1500000001},
		output: '1.5 GB'
	},
	{
		template: '{{humanBytes a}}',
		input: {a:15000000000001},
		output: '15 TB'
	},
	{
		template: '{{humanBytes a}}',
		input: {a:1000000000000001},
		output: '1000 TB'
	}
]);
