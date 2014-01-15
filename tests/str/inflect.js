
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{inflect a b c}}',
		input: {a:1, b:'Mouse', c:'Mice', d:false},
		output: 'Mouse'
	},
	{
		template: '{{inflect a b c d}}',
		input: {a:1, b:'Mouse', c:'Mice', d:true},
		output: '1 Mouse'
	},
	{
		template: '{{inflect a b c d}}',
		input: {a:2, b:'Mouse', c:'Mice', d:true},
		output: '2 Mice'
	}
]);
