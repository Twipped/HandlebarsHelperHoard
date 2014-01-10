
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{has a b}}',
		input: {a:[1,2,3], b:2},
		output: 'true'
	},
	{
		template: '{{has a b}}',
		input: {a:[1,2,3], b:0},
		output: ''
	},
	{
		template: '{{#has a b}}yes{{else}}no{{/has}}',
		input: {a:[1,2,3], b:1},
		output: 'yes'
	},
	{
		template: '{{#has a b}}yes{{else}}no{{/has}}',
		input: {a:[1,2,3], b:4},
		output: 'no'
	}
]);