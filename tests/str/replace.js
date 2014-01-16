
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{replace a b c}}',
		input: {a:'abcdef', b:'cd', c:'xy'},
		output: 'abxyef'
	},
	{
		template: '{{replace a search=b replace=c}}',
		input: {a:'abcdef', b:'cd', c:'xy'},
		output: 'abxyef'
	},
	{
		template: '{{replace a search=b}}',
		input: {a:'abcdef', b:'cd', c:'xy'},
		output: 'abef'
	},
	{
		template: '{{#replace search=a replace=b}}abcdef{{/replace}}',
		input: {a:'cd', b:'xy'},
		output: 'abxyef'
	},
	{
		template: '{{#replace search=a}}abcdef{{/replace}}',
		input: {a:'cd'},
		output: 'abef'
	}
]);
