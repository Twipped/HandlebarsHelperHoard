
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{isntLike a b}}',
		input: {a:1, b:2},
		output: 'true'
	},
	{
		template: '{{isntLike a b}}',
		input: {a:2, b:1},
		output: 'true'
	},
	{
		template: '{{isntLike a b}}',
		input: {a:2, b:2},
		output: ''
	},
	{
		template: '{{isntLike a b}}',
		input: {a:'2', b:2},
		output: ''
	},
	{
		template: '{{isntLike a b}}',
		input: {a:'2', b:'1'},
		output: 'true'
	},
	{
		template: '{{#isntLike a b}}yes{{else}}no{{/isntLike}}',
		input: {a:1, b:2},
		output: 'yes'
	},
	{
		template: '{{#isntLike a b}}yes{{else}}no{{/isntLike}}',
		input: {a:2, b:1},
		output: 'yes'
	},
	{
		template: '{{#isntLike a b}}yes{{else}}no{{/isntLike}}',
		input: {a:2, b:2},
		output: 'no'
	},
	{
		template: '{{#isntLike a b}}yes{{else}}no{{/isntLike}}',
		input: {a:2, b:'2'},
		output: 'no'
	},
	{
		template: '{{#isntLike a b}}yes{{else}}no{{/isntLike}}',
		input: {a:'2', b:'1'},
		output: 'yes'
	}
]);