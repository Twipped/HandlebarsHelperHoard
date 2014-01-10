
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{padRight a}}',
		input: {a:'1234567890'},
		output: '1234567890'
	},
	{
		template: '{{padRight a b}}',
		input: {a:'1234567890', b:10},
		output: '1234567890'
	},
	{
		template: '{{padRight a b}}',
		input: {a:'1234567890', b:12},
		output: '  1234567890'
	},
	{
		template: '{{{padRight a b c}}}',
		input: {a:'1234567890', b:12, c:'.'},
		output: '..1234567890'
	},
	{
		template: '{{{padRight a b c}}}',
		input: {a:'1234567890', b:12, c:'&nbsp;'},
		output: '&nbsp;&nbsp;1234567890'
	},
	{
		template: '{{#padRight length=12 using="."}}{{a}}{{/padRight}}',
		input: {a:'1234567890'},
		output: '..1234567890'
	}
]);
