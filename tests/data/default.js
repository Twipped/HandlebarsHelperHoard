
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{default a b}}',
		input: {a:1, b:2},
		output: '1'
	},
	{
		template: '{{default a b}}',
		input: {a:false, b:2},
		output: '2'
	},
	{
		template: '{{default a b}}',
		input: {a:true, b:false},
		output: 'true'
	},
	{
		template: '{{default a b}}',
		input: {b:2},
		output: '2'
	}
]);
