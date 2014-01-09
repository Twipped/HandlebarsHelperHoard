
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{compare a b}}',
		input: {a:1, b:1},
		output: 'true'
	},
	{
		template: '{{compare a "===" b}}',
		input: {a:1, b:1},
		output: 'true'
	},
	{
		template: '{{compare a "===" b}}',
		input: {a:1, b:2},
		output: ''
	},
	{
		template: '{{compare a "==" b}}',
		input: {a:1, b:'1'},
		output: 'true'
	},
	{
		template: '{{compare a "==" b}}',
		input: {a:1, b:'0'},
		output: ''
	},
	{
		template: '{{compare a "typeof" b}}',
		input: {a:1, b:'number'},
		output: 'true'
	},
	{
		template: '{{compare a "%" b}}',
		input: {a:11, b:2},
		output: 'true'
	},
	{
		template: '{{compare a "%" b}}',
		input: {a:10, b:2},
		output: ''
	},
	{
		template: '{{#compare a b}}content{{/compare}}',
		input: {a:1, b:1},
		output: 'content'
	},
	{
		template: '{{#compare a b}}content a{{else}}content b{{/compare}}',
		input: {a:1, b:1},
		output: 'content a'
	},
	{
		template: '{{#compare a b}}content a{{else}}content b{{/compare}}',
		input: {a:1, b:0},
		output: 'content b'
	},
]);