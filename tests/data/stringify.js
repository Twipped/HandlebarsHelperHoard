
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{stringify a}}',
		input: {a:1},
		output: '1'
	},
	{
		template: '{{stringify a}}',
		input: {a:"1"},
		output: '"1"'
	},
	{
		template: '{{stringify a}}',
		input: {a:['a','b']},
		output: '["a","b"]'
	},
	{
		template: '{{stringify a}}',
		input: {a:{b:1,c:'2'}},
		output: '{"b":1,"c":"2"}'
	},
]);
