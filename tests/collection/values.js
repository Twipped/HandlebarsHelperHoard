
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{values a}}',
		input: {a:['a','b','c']},
		output: 'a,b,c'
	},
	{
		template: '{{values a}}',
		input: {a:{a:1, b: 2, c:3}},
		output: '1,2,3'
	},
	{
		template: '{{values a}}',
		input: {a:[]},
		output: ''
	},
	{
		template: '{{#values a}}<{{this}}>{{else}}no{{/values}}',
		input: {a:['a','b','c']},
		output: '<a><b><c>'
	},
	{
		template: '{{#values a}}<{{this}}>{{else}}no{{/values}}',
		input: {a:[]},
		output: 'no'
	}
]);
