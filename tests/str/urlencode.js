
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{{urlencode a}}}',
		input: {a:'praesent123~!@#$%^&*(){}[]=:/,;?+\'"\\'},
		output: 'praesent123~!%40%23%24%25%5E%26*()%7B%7D%5B%5D%3D%3A%2F%2C%3B%3F%2B\'%22%5C'
	},
	{
		template: '{{urlencode a}}',
		input: {a:'praesent123~!@#$%^&*(){}[]=:/,;?+\'"\\'},
		output: 'praesent123~!%40%23%24%25%5E%26*()%7B%7D%5B%5D%3D%3A%2F%2C%3B%3F%2B&#x27;%22%5C'
	},
	{
		template: '{{#urlencode}}{{{a}}}{{/urlencode}}',
		input: {a:'praesent123~!@#$%^&*(){}[]=:/,;?+\'"\\'},
		output: 'praesent123~!%40%23%24%25%5E%26*()%7B%7D%5B%5D%3D%3A%2F%2C%3B%3F%2B\'%22%5C'
	},
	{
		template: '{{#urlencode}}{{a}}{{/urlencode}}',
		input: {a:'praesent123~!@#$%^&*(){}[]=:/,;?+\'"\\'},
		output: 'praesent123~!%40%23%24%25%5E%26amp%3B*()%7B%7D%5B%5D%3D%3A%2F%2C%3B%3F%2B%26%23x27%3B%26quot%3B%5C'
	}
]);
