
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{div a b c d}}',
		input: {a:[10000,2], b:4, c:5},
		output: '250'
	},
	{
		template: '{{div a b}}',
		input: {a:10000, b:0},
		output: '10000' //ignores non-divisable values
	},
	{
		template: '{{div a}}',
		input: {a:[100,2,4]},
		output: '12.5'
	},
	{
		template: '{{div a b}}',
		input: {a:10, b:2},
		output: '5'
	}
]);