
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{is a b}}',
		input: {a:1, b:2},
		output: ''
	},
	{
		template: '{{is a b}}',
		input: {a:2, b:1},
		output: ''
	},
	{
		template: '{{is a b}}',
		input: {a:2, b:2},
		output: 'true'
	},
	{
		template: '{{is a b}}',
		input: {a:'2', b:2},
		output: ''
	},
	{
		template: '{{#is a b}}yes{{else}}no{{/is}}',
		input: {a:1, b:2},
		output: 'no'
	},
	{
		template: '{{#is a b}}yes{{else}}no{{/is}}',
		input: {a:2, b:1},
		output: 'no'
	},
	{
		template: '{{#is a b}}yes{{else}}no{{/is}}',
		input: {a:2, b:2},
		output: 'yes'
	},
	{
		template: '{{#is a b}}yes{{else}}no{{/is}}',
		input: {a:2, b:'2'},
		output: 'no'
	}
]);