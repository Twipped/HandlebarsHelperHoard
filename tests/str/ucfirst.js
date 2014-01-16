
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{ucfirst a}}',
		input: {a:'praesent commodo cursus magna, vel scelerisque nisl consectetur et'},
		output: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et'
	},
	{
		template: '{{#ucfirst}}{{a}}{{/ucfirst}}',
		input: {a:'praesent commodo cursus magna, vel scelerisque nisl consectetur et'},
		output: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et'
	}
]);
