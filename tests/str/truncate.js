
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{truncate a b}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et', b:20},
		output: 'Praesent commodo cu\u2026'
	},
	{
		template: '{{truncate a b c}}',
		input: {a:'Praesent commodo cursus magna, vel scelerisque nisl consectetur et', b:20, c:'...'},
		output: 'Praesent commodo...'
	}
]);
