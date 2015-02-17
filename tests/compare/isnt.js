
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{isnt a b}}',
		input: {a:1, b:2},
		output: 'true'
	},
	{
		template: '{{isnt a b}}',
		input: {a:2, b:1},
		output: 'true'
	},
	{
		template: '{{isnt a b}}',
		input: {a:2, b:2},
		output: ''
	},
	{
		template: '{{isnt a b}}',
		input: {a:'2', b:2},
		output: 'true'
	},
	{
		template: '{{#isnt a b}}yes{{else}}no{{/isnt}}',
		input: {a:1, b:2},
		output: 'yes'
	},
	{
		template: '{{#isnt a b}}yes{{else}}no{{/isnt}}',
		input: {a:2, b:1},
		output: 'yes'
	},
	{
		template: '{{#isnt a b}}yes{{else}}no{{/isnt}}',
		input: {a:2, b:2},
		output: 'no'
	},
	{
		template: '{{#isnt a b}}yes{{else}}no{{/isnt}}',
		input: {a:2, b:'2'},
		output: 'yes'
	},
	{
		template: '{{#isnt 2 2 "2" 1}}yes{{else}}no{{/isnt}}',
		input: {},
		output: 'no'
	},
	{
		template: '{{#isnt 2 "1" "2"}}yes{{else}}no{{/isnt}}',
		input: {},
		output: 'yes'
	}
]);