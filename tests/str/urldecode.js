
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{{urldecode a}}}',
		input: {a:'praesent123~!%40%23%24%25%5E%26*()%7B%7D%5B%5D%3D%3A%2F%2C%3B%3F%2B\'%22%5C'},
		output: 'praesent123~!@#$%^&*(){}[]=:/,;?+\'"\\'
	},
	{
		template: '{{#urldecode}}{{{a}}}{{/urldecode}}',
		input: {a:'praesent123~!%40%23%24%25%5E%26*()%7B%7D%5B%5D%3D%3A%2F%2C%3B%3F%2B\'%22%5C'},
		output: 'praesent123~!@#$%^&*(){}[]=:/,;?+\'"\\'
	}
]);
