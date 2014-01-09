
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{gt a b}}',
		input: {a:1, b:2},
		output: ''
	},
	{
		template: '{{gt a b}}',
		input: {a:2, b:1},
		output: 'true'
	},
	{
		template: '{{gt a b}}',
		input: {a:2, b:2},
		output: ''
	},
	{
		template: '{{#gt a b}}yes{{else}}no{{/gt}}',
		input: {a:1, b:2},
		output: 'no'
	},
	{
		template: '{{#gt a b}}yes{{else}}no{{/gt}}',
		input: {a:2, b:1},
		output: 'yes'
	},
	{
		template: '{{#gt a b}}yes{{else}}no{{/gt}}',
		input: {a:2, b:2},
		output: 'no'
	}
]);