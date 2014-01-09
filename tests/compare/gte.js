
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{gte a b}}',
		input: {a:1, b:2},
		output: ''
	},
	{
		template: '{{gte a b}}',
		input: {a:2, b:1},
		output: 'true'
	},
	{
		template: '{{gte a b}}',
		input: {a:2, b:2},
		output: 'true'
	},
	{
		template: '{{#gte a b}}yes{{else}}no{{/gte}}',
		input: {a:1, b:2},
		output: 'no'
	},
	{
		template: '{{#gte a b}}yes{{else}}no{{/gte}}',
		input: {a:2, b:1},
		output: 'yes'
	},
	{
		template: '{{#gte a b}}yes{{else}}no{{/gte}}',
		input: {a:2, b:2},
		output: 'yes'
	}
]);
