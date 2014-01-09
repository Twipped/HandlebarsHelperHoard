
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{keys a}}',
		input: {a:['a','b','c']},
		output: '0,1,2'
	},
	{
		template: '{{keys a}}',
		input: {a:{a:1, b: 2, c:3}},
		output: 'a,b,c'
	},
	{
		template: '{{keys a}}',
		input: {a:[]},
		output: ''
	},
	{
		template: '{{#keys a}}<{{this}}>{{else}}no{{/keys}}',
		input: {a:['a','b','c']},
		output: '<0><1><2>'
	},
	{
		template: '{{#keys a}}<{{this}}>{{else}}no{{/keys}}',
		input: {a:[]},
		output: 'no'
	}
]);