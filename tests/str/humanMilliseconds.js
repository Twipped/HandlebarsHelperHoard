
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{humanMilliseconds a}}',
		input: {a:5},
		output: '5 Milliseconds'
	},
	{
		template: '{{humanMilliseconds a}}',
		input: {a:1000},
		output: '1 Second'
	},
	{
		template: '{{humanMilliseconds a}}',
		input: {a:2000},
		output: '2 Seconds'
	},
	{
		template: '{{humanMilliseconds a}}',
		input: {a:60000},
		output: '1 Minute'
	},
	{
		template: '{{humanMilliseconds a}}',
		input: {a:60*65*1000},
		output: '1 Hour'
	},
	{
		template: '{{humanMilliseconds a true}}',
		input: {a:60*65*1000},
		output: '1 Hour 5 Minutes'
	},
	{
		template: '{{humanMilliseconds a}}',
		input: {a:60*60*24*1000},
		output: '1 Day'
	},
	{
		template: '{{humanMilliseconds a}}',
		input: {a:60*60*24*7*1000},
		output: '1 Week'
	},
	{
		template: '{{humanMilliseconds a}}',
		input: {a:60*60*24*30*1000},
		output: '1 Month'
	},
	{
		template: '{{humanMilliseconds a}}',
		input: {a:60*60*24*365*1000},
		output: '1 Year'
	},
	{
		template: '{{humanMilliseconds a}}',
		input: {a:60*60*24*365*100*1000},
		output: '100 Years'
	}
]);
