
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{contains a b}}',
		input: {a:[1,2,3], b:2},
		output: 'true'
	},
	{
		template: '{{contains a b}}',
		input: {a:[1,2,3], b:0},
		output: ''
	},
	{
		template: '{{#contains a b}}yes{{else}}no{{/contains}}',
		input: {a:[1,2,3], b:1},
		output: 'yes'
	},
	{
		template: '{{#contains a b}}yes{{else}}no{{/contains}}',
		input: {a:[1,2,3], b:4},
		output: 'no'
	}
]);