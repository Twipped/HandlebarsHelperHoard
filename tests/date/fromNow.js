
var makeTests = require('../testBuilder.js');
var moment = require('moment');
var past = moment().subtract(70, 'days').format();
var future = moment().add(2, 'weeks').format();

module.exports = makeTests([
	{
		template: '{{fromNow a}}',
		input: {a:past},
		output: '2 months ago'
	},
	{
		template: '{{fromNow a}}',
		input: {a:future},
		output: 'in 14 days'
	},
	{
		template: '{{fromNow a}}',
		input: {a:'invalid'},
		output: ''
	},
	{
		template: '{{fromNow a}}',
		input: {a:''},
		output: ''
	}
]);
