
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{gist 8251885}}',
		output: '<script src="https://gist.github.com/8251885.js"></script>'
	}
]);