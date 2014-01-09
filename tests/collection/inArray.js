
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{inArray a b}}',
		input: {a:[1,2,3], b:2},
		output: 'true'
	},
	{
		template: '{{inArray a b}}',
		input: {a:[1,2,3], b:0},
		output: ''
	},
	{
		template: '{{#inArray a b}}yes{{else}}no{{/inArray}}',
		input: {a:[1,2,3], b:1},
		output: 'yes'
	},
	{
		template: '{{#inArray a b}}yes{{else}}no{{/inArray}}',
		input: {a:[1,2,3], b:4},
		output: 'no'
	}
]);