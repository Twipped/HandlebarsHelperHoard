
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{isNotLike a b}}',
		input: {a:1, b:2},
		output: 'true'
	},
	{
		template: '{{isNotLike a b}}',
		input: {a:2, b:1},
		output: 'true'
	},
	{
		template: '{{isNotLike a b}}',
		input: {a:2, b:2},
		output: ''
	},
	{
		template: '{{isNotLike a b}}',
		input: {a:'2', b:2},
		output: ''
	},
	{
		template: '{{isNotLike a b}}',
		input: {a:'2', b:'1'},
		output: 'true'
	},
	{
		template: '{{#isNotLike a b}}yes{{else}}no{{/isNotLike}}',
		input: {a:1, b:2},
		output: 'yes'
	},
	{
		template: '{{#isNotLike a b}}yes{{else}}no{{/isNotLike}}',
		input: {a:2, b:1},
		output: 'yes'
	},
	{
		template: '{{#isNotLike a b}}yes{{else}}no{{/isNotLike}}',
		input: {a:2, b:2},
		output: 'no'
	},
	{
		template: '{{#isNotLike a b}}yes{{else}}no{{/isNotLike}}',
		input: {a:2, b:'2'},
		output: 'no'
	},
	{
		template: '{{#isNotLike a b}}yes{{else}}no{{/isNotLike}}',
		input: {a:'2', b:'1'},
		output: 'yes'
	},
	{
		template: '{{#isNotLike 2 "1" "2"}}yes{{else}}no{{/isNotLike}}',
		input: {},
		output: 'no'
	}
]);