
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{numberFormat a}}',
		input: {a:1234.56},
		output: '1,235'
	},
	{
		template: '{{numberFormat a b c d}}',
		input: {a:1234.5678, b:'2', c:'.', d: ''},
		output: '1234.57'
	},
	{
		template: '{{numberFormat a b c d}}',
		input: {a:1234.56, b:2, c:',', d: ' '},
		output: '1 234,56'
	},
	{
		template: '{{numberFormat a b c d}}',
		input: {a:67, b:2, c:',', d:'.'},
		output: '67,00'
	},
	{
		template: '{{numberFormat a}}',
		input: {a:1000},
		output: '1,000'
	},
	{
		template: '{{numberFormat a b}}',
		input: {a:1000.55, b:1},
		output: '1,000.6'
	},
	{
		template: '{{numberFormat a b c d}}',
		input: {a:67000, b:5, c:',', d: '.'},
		output: '67.000,00000'
	},
	{
		template: '{{numberFormat a b}}',
		input: {a:0.9, b:0},
		output: '1'
	},
	{
		template: '{{numberFormat a b}}',
		input: {a:'1.20', b:2},
		output: '1.20'
	},
	{
		template: '{{numberFormat a b}}',
		input: {a:'1.20', b:4},
		output: '1.2000'
	},
	{
		template: '{{numberFormat a b}}',
		input: {a:'1.2000', b:3},
		output: '1.200'
	},
	{
		template: '{{numberFormat a b c d}}',
		input: {a:'1 000,50', b:2, c:'.', d:' '},
		output: '100 050.00'
	},
]);
