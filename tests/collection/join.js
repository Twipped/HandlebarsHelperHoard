
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{join a}}',
		input: {a:[1,2,3]},
		output: '1,2,3'
	},
	{
		template: '{{join a "-"}}',
		input: {a:[1,2,3]},
		output: '1-2-3'
	},
	{
		template: '{{join a ""}}',
		input: {a:[1,2,3]},
		output: '123'
	},
	{
		template: '{{#join a "|"}}<{{this}}>{{else}}no{{/join}}',
		input: {a:[1,2,3]},
		output: '<1>|<2>|<3>'
	},
	{
		template: '{{#join a "|"}}<{{this}}>{{else}}no{{/join}}',
		input: {a:[]},
		output: 'no'
	}
]);