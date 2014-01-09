
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{isLike a b}}',
		input: {a:1, b:2},
		output: ''
	},
	{
		template: '{{isLike a b}}',
		input: {a:2, b:1},
		output: ''
	},
	{
		template: '{{isLike a b}}',
		input: {a:2, b:2},
		output: 'true'
	},
	{
		template: '{{isLike a b}}',
		input: {a:'2', b:2},
		output: 'true'
	},
	{
		template: '{{isLike a b}}',
		input: {a:'2', b:'1'},
		output: ''
	},
	{
		template: '{{#isLike a b}}yes{{else}}no{{/isLike}}',
		input: {a:1, b:2},
		output: 'no'
	},
	{
		template: '{{#isLike a b}}yes{{else}}no{{/isLike}}',
		input: {a:2, b:1},
		output: 'no'
	},
	{
		template: '{{#isLike a b}}yes{{else}}no{{/isLike}}',
		input: {a:2, b:2},
		output: 'yes'
	},
	{
		template: '{{#isLike a b}}yes{{else}}no{{/isLike}}',
		input: {a:2, b:'2'},
		output: 'yes'
	},
	{
		template: '{{#isLike a b}}yes{{else}}no{{/isLike}}',
		input: {a:'2', b:'1'},
		output: 'no'
	}
]);