
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{pi}}',
		output: String(Math.PI)
	}
]);