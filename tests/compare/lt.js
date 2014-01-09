
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{lt a b}}',
		input: {a:1, b:2},
		output: 'true'
	},
	{
		template: '{{lt a b}}',
		input: {a:2, b:1},
		output: ''
	},
	{
		template: '{{lt a b}}',
		input: {a:2, b:2},
		output: ''
	},
	{
		template: '{{#lt a b}}yes{{else}}no{{/lt}}',
		input: {a:1, b:2},
		output: 'yes'
	},
	{
		template: '{{#lt a b}}yes{{else}}no{{/lt}}',
		input: {a:2, b:1},
		output: 'no'
	},
	{
		template: '{{#lt a b}}yes{{else}}no{{/lt}}',
		input: {a:2, b:2},
		output: 'no'
	}
]);
