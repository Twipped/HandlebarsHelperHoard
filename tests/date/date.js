
var makeTests = require('../testBuilder.js');
var moment = require('moment');

module.exports = makeTests([
	{
		template: '{{date}}',
		output: moment().format('YYYY-MM-DD HH:mm:ss')
	},
	{
		template: '{{date a}}',
		input: {a:'MMM Mo, YYYY'},
		output: moment().format('MMM Mo, YYYY')
	},
	{
		template: '{{date a b}}',
		input: {a:'MMM Mo, YYYY', b:'1-1-2010'},
		output: 'Jan 1st, 2010'
	},
	{
		template: '{{date a b parse=c}}',
		input: {a:'MMM Do, YYYY', b:'12,02,2010', c:'MM,DD,YYYY'},
		output: 'Dec 2nd, 2010'
	}
]);
