
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{contains a b}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.', b:'is'},
		output: '2'
	},
	{
		template: '{{contains a b}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.', b:'ex'},
		output: '0'
	},
	{
		template: '{{#contains a b}}yes{{else}}no{{/contains}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.', b:'is'},
		output: 'yes'
	},
	{
		template: '{{#contains a b}}yes{{else}}no{{/contains}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.', b:'ex'},
		output: 'no'
	}
]);
