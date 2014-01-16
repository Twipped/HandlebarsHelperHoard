
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{ucsentences a}}',
		input: {a:'praesent commodo cursus magna. vel scelerisque nisl consectetur et'},
		output: 'Praesent commodo cursus magna. Vel scelerisque nisl consectetur et'
	},
	{
		template: '{{#ucsentences}}{{a}}{{/ucsentences}}',
		input: {a:'praesent commodo cursus magna. vel scelerisque nisl consectetur et'},
		output: 'Praesent commodo cursus magna. Vel scelerisque nisl consectetur et'
	}
]);
