
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{or a b c}}',
		input: {a:1, b:2, c:0},
		output: '1'
	},
	{
		template: '{{or a b}}',
		input: {a:0, b:1},
		output: '1'
	},
	{
		template: '{{or a b}}',
		input: {a:'0', b:'1'},
		output: '0'
	},
	{
		template: '{{or a}}',
		input: {a:1, b:2, c:0},
		output: '1'
	},
	{
		template: '{{or c}}',
		input: {a:1, b:2, c:0},
		output: '0'
	},
	{
		template: '{{or "<div>"}}',
		output: '&lt;div&gt;'
	},
	{
		template: '{{{or "<div>"}}}',
		output: '<div>'
	},
	{
		template: '{{#or a b c}}content{{/or}}',
		input: {a:1, b:2, c:0},
		output: 'content'
	},
	{
		template: '{{#or a b}}content{{/or}}',
		input: {a:0, b:0},
		output: ''},
	{
		template: '{{#or a b}}content{{else}}other content{{/or}}',
		input: {a:0, b:''},
		output: 'other content'
	},
	{
		template: '{{#or a}}content{{/or}}',
		input: {a:1, b:2},
		output: 'content'
	}
]);