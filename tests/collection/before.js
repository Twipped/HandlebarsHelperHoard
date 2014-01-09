
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{before a }}',
		input: {a:[1,2,3,4,5]},
		output: ''
	},
	{
		template: '{{before a 3}}',
		input: {a:[1,2,3,4,5]},
		output: '1,2'
	},
	{
		template: '{{before a 6}}',
		input: {a:[1,2,3,4,5]},
		output: ''
	},
	{
		template: '{{#before a }}|{{this}}|{{/before}}',
		input: {a:[1,2,3,4,5]},
		output: ''
	},
	{
		template: '{{#before a 3}}|{{this}}|{{/before}}',
		input: {a:[1,2,3,4,5]},
		output: '|1||2|'
	},
	{
		template: '{{#before a 6}}|{{this}}|{{/before}}',
		input: {a:[1,2,3,4,5]},
		output: ''
	},
]);