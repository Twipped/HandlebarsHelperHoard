
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{lowercase a}}',
		input: {a:'PRAESENT COMMODO CURSUS MAGNA, VEL SCELERISQUE NISL CONSECTETUR ET'},
		output: 'praesent commodo cursus magna, vel scelerisque nisl consectetur et'
	},
	{
		template: '{{#lowercase}}{{a}}{{/lowercase}}',
		input: {a:'PRAESENT COMMODO CURSUS MAGNA, VEL SCELERISQUE NISL CONSECTETUR ET'},
		output: 'praesent commodo cursus magna, vel scelerisque nisl consectetur et'
	}
]);
