
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{and a b c}}',
		input: {a:1, b:2, c:0},
		output: '0'
	},
	{
		template: '{{and a b}}',
		input: {a:0, b:1},
		output: '0'
	},
	{
		template: '{{and a b}}',
		input: {a:'', b:'1'},
		output: ''
	},
	{
		template: '{{and a b}}',
		input: {a:'0', b:'1'},
		output: '1'
	},
	{
		template: '{{and a}}',
		input: {a:1, b:2, c:0},
		output: '1'
	},
	{
		template: '{{and c}}',
		input: {a:1, b:2, c:0},
		output: '0'
	},
	{
		template: '{{and "<div>"}}',
		output: '&lt;div&gt;'
	},
	{
		template: '{{{and "<div>"}}}',
		output: '<div>'
	},
	{
		template: '{{#and a b c}}content{{/and}}',
		input: {a:1, b:2, c:0},
		output: ''
	},
	{
		template: '{{#and a b}}content{{/and}}',
		input: {a:0, b:0},
		output: ''},
	{
		template: '{{#and a b}}content{{else}}other content{{/and}}',
		input: {a:0, b:''},
		output: 'other content'
	},
	{
		template: '{{#and a}}content{{/and}}',
		input: {a:1, b:2},
		output: 'content'
	}
]);
