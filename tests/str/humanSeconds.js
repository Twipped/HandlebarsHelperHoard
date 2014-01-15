
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{humanSeconds a}}',
		input: {a:1},
		output: '1 Second'
	},
	{
		template: '{{humanSeconds a}}',
		input: {a:2},
		output: '2 Seconds'
	},
	{
		template: '{{humanSeconds a}}',
		input: {a:60},
		output: '1 Minute'
	},
	{
		template: '{{humanSeconds a}}',
		input: {a:60*65},
		output: '1 Hour'
	},
	{
		template: '{{humanSeconds a true}}',
		input: {a:60*65},
		output: '1 Hour 5 Minutes'
	},
	{
		template: '{{humanSeconds a}}',
		input: {a:60*60*24},
		output: '1 Day'
	},
	{
		template: '{{humanSeconds a}}',
		input: {a:60*60*24*7},
		output: '1 Week'
	},
	{
		template: '{{humanSeconds a}}',
		input: {a:60*60*24*30},
		output: '1 Month'
	},
	{
		template: '{{humanSeconds a}}',
		input: {a:60*60*24*365},
		output: '1 Year'
	},
	{
		template: '{{humanSeconds a}}',
		input: {a:60*60*24*365*100},
		output: '100 Years'
	}
]);
