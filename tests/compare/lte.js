
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{lte a b}}',
		input: {a:1, b:2},
		output: 'true'
	},
	{
		template: '{{lte a b}}',
		input: {a:2, b:1},
		output: ''
	},
	{
		template: '{{lte a b}}',
		input: {a:2, b:2},
		output: 'true'
	},
	{
		template: '{{#lte a b}}yes{{else}}no{{/lte}}',
		input: {a:1, b:2},
		output: 'yes'
	},
	{
		template: '{{#lte a b}}yes{{else}}no{{/lte}}',
		input: {a:2, b:1},
		output: 'no'
	},
	{
		template: '{{#lte a b}}yes{{else}}no{{/lte}}',
		input: {a:2, b:2},
		output: 'yes'
	}
]);
