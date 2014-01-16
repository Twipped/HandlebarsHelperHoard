
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{uppercase a}}',
		input: {a:'praesent commodo cursus magna, vel scelerisque nisl consectetur et'},
		output: 'PRAESENT COMMODO CURSUS MAGNA, VEL SCELERISQUE NISL CONSECTETUR ET'
	},
	{
		template: '{{#uppercase}}{{a}}{{/uppercase}}',
		input: {a:'praesent commodo cursus magna, vel scelerisque nisl consectetur et'},
		output: 'PRAESENT COMMODO CURSUS MAGNA, VEL SCELERISQUE NISL CONSECTETUR ET'
	}
]);
