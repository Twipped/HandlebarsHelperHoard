
var makeTests = require('../testBuilder.js');
var cwd = __dirname;

module.exports = makeTests([
	{
		template: '{{embed "tests/_fixtures/embeded.html"}}',
		output: '<p>Embedded Text</p>'
	},
	{
		template: '{{embed "../_fixtures/embeded.html" a}}',
		input: {a:cwd},
		output: '<p>Embedded Text</p>'
	}
]);
