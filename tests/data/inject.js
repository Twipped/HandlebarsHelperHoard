
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: 'a={{a}},[{{#inject c=2}}a={{a}},c={{c}}{{/inject}}],c={{c}}',
		input: {a:1},
		output: 'a=1,[a=1,c=2],c='
	},
	{
		template: 'a={{a}},[{{#inject c=\'{"d":"foo"}\'}}a={{a}},c.d={{c.d}}{{/inject}}],c={{c}}',
		input: {a:1},
		output: 'a=1,[a=1,c.d=foo],c='
	}
]);
