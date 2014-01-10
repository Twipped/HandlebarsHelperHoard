
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{padCenter a}}',
		input: {a:'1234567890'},
		output: '1234567890'
	},
	{
		template: '{{padCenter a b}}',
		input: {a:'1234567890', b:10},
		output: '1234567890'
	},
	{
		template: '{{padCenter a b}}',
		input: {a:'1234567890', b:12},
		output: ' 1234567890 '
	},
	{
		template: '{{{padCenter a b c}}}',
		input: {a:'1234567890', b:12, c:'.'},
		output: '.1234567890.'
	},
	{
		template: '{{{padCenter a b c}}}',
		input: {a:'1234567890', b:13, c:'.'},
		output: '.1234567890..'
	},
	{
		template: '{{{padCenter a b c}}}',
		input: {a:'1234567890', b:12, c:'&nbsp;'},
		output: '&nbsp;1234567890&nbsp;'
	},
	{
		template: '{{#padCenter length=13 using="."}}{{a}}{{/padCenter}}',
		input: {a:'1234567890'},
		output: '.1234567890..'
	}
]);
