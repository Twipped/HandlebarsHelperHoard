
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: ' {{ol a}}',
		input: {a:'<A>'},
		output: ' <ol><li>&lt;A&gt;</li></ol>'
	},
	{
		template: ' {{ol a}}',
		input: {a:['<A>', 'B']},
		output: ' <ol><li>&lt;A&gt;</li><li>B</li></ol>'
	},
	{
		template: ' {{#ol a}}<p>{{this}}</p>{{/ol}}',
		input: {a:['<A>', 'B']},
		output: ' <ol><li><p>&lt;A&gt;</p></li><li><p>B</p></li></ol>'
	}
]);