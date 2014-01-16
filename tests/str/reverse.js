
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{reverse a}}',
		input: {a:'abcdef'},
		output: 'fedcba'
	},
	{
		template: '{{#reverse}}abcdef{{/reverse}}',
		input: {a:'abcdef'},
		output: 'fedcba'
	},
	{
		template: '{{reverse a}}',
		input: {a:1},
		output: '-1'
	},
	{
		template: '{{reverse a}}',
		input: {a:['ab','cd','ef']},
		output: 'ef,cd,ab'
	}
]);
