
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{ucwords a}}',
		input: {a:'praesent commodo cursus magna, vel scelerisque nisl consectetur et'},
		output: 'Praesent Commodo Cursus Magna, Vel Scelerisque Nisl Consectetur Et'
	},
	{
		template: '{{#ucwords}}{{a}}{{/ucwords}}',
		input: {a:'praesent commodo cursus magna, vel scelerisque nisl consectetur et'},
		output: 'Praesent Commodo Cursus Magna, Vel Scelerisque Nisl Consectetur Et'
	}
]);
