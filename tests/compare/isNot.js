
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{isNot a b}}',
		input: {a:1, b:2},
		output: 'true'
	},
	{
		template: '{{isNot a b}}',
		input: {a:2, b:1},
		output: 'true'
	},
	{
		template: '{{isNot a b}}',
		input: {a:2, b:2},
		output: ''
	},
	{
		template: '{{isNot a b}}',
		input: {a:'2', b:2},
		output: 'true'
	},
	{
		template: '{{#isNot a b}}yes{{else}}no{{/isNot}}',
		input: {a:1, b:2},
		output: 'yes'
	},
	{
		template: '{{#isNot a b}}yes{{else}}no{{/isNot}}',
		input: {a:2, b:1},
		output: 'yes'
	},
	{
		template: '{{#isNot a b}}yes{{else}}no{{/isNot}}',
		input: {a:2, b:2},
		output: 'no'
	},
	{
		template: '{{#isNot a b}}yes{{else}}no{{/isNot}}',
		input: {a:2, b:'2'},
		output: 'yes'
	},
	{
		template: '{{#isNot 2 2 "2" 1}}yes{{else}}no{{/isNot}}',
		input: {},
		output: 'no'
	},
	{
		template: '{{#isNot 2 "1" "2"}}yes{{else}}no{{/isNot}}',
		input: {},
		output: 'yes'
	}
]);