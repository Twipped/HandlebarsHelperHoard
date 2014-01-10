
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{padLeft a}}',
		input: {a:'1234567890'},
		output: '1234567890'
	},
	{
		template: '{{padLeft a b}}',
		input: {a:'1234567890', b:10},
		output: '1234567890'
	},
	{
		template: '{{padLeft a b}}',
		input: {a:'1234567890', b:12},
		output: '1234567890  '
	},
	{
		template: '{{{padLeft a b c}}}',
		input: {a:'1234567890', b:12, c:'.'},
		output: '1234567890..'
	},
	{
		template: '{{{padLeft a b c}}}',
		input: {a:'1234567890', b:12, c:'&nbsp;'},
		output: '1234567890&nbsp;&nbsp;'
	},
	{
		template: '{{#padLeft length=12 using="."}}{{a}}{{/padLeft}}',
		input: {a:'1234567890'},
		output: '1234567890..'
	}
]);
