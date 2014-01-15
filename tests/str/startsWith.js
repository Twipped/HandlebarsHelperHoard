
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{startsWith a b}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et', b:'Pr'},
		output: 'true'
	},
	{
		template: '{{startsWith a b}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et', b:'pr'},
		output: ''
	},
	{
		template: '{{startsWith a b}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et', b:'ra'},
		output: ''
	},
	{
		template: '{{#startsWith a b}}yes{{else}}no{{/startsWith}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et', b:'Pr'},
		output: 'yes'
	},
	{
		template: '{{#startsWith a b}}yes{{else}}no{{/startsWith}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et', b:'ra'},
		output: 'no'
	}
]);
