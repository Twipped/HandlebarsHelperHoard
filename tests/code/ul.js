
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: ' {{ul a}}',
		input: {a:'<A>'},
		output: ' <ul><li>&lt;A&gt;</li></ul>'
	},
	{
		template: ' {{ul a}}',
		input: {a:['<A>', 'B']},
		output: ' <ul><li>&lt;A&gt;</li><li>B</li></ul>'
	},
	{
		template: ' {{#ul a}}<p>{{this}}</p>{{/ul}}',
		input: {a:['<A>', 'B']},
		output: ' <ul><li><p>&lt;A&gt;</p></li><li><p>B</p></li></ul>'
	}
]);