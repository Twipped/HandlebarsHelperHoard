
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{ordinalize a}}',
		input: {a:1},
		output: '1st'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:2},
		output: '2nd'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:3},
		output: '3rd'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:4},
		output: '4th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:5},
		output: '5th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:6},
		output: '6th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:7},
		output: '7th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:8},
		output: '8th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:9},
		output: '9th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:10},
		output: '10th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:11},
		output: '11th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:12},
		output: '12th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:13},
		output: '13th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:14},
		output: '14th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:20},
		output: '20th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:21},
		output: '21st'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:22},
		output: '22nd'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:100},
		output: '100th'
	},
	{
		template: '{{ordinalize a}}',
		input: {a:101},
		output: '101st'
	}
]);
