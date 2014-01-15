
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{endsWith a b}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et', b:'et'},
		output: 'true'
	},
	{
		template: '{{endsWith a b}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et', b:'es'},
		output: ''
	},
	{
		template: '{{#endsWith a b}}yes{{else}}no{{/endsWith}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et', b:'et'},
		output: 'yes'
	},
	{
		template: '{{#endsWith a b}}yes{{else}}no{{/endsWith}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et', b:'es'},
		output: 'no'
	}
]);
