
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{split a ","}}',
		input: {a:'1,2,3'},
		output: '1,2,3'
	},
	{
		template: '{{#split a ","}}<{{this}}>{{else}}no{{/split}}',
		input: {a:'1,2,3'},
		output: '<1><2><3>'
	}
]);