
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{filter original }}',
		input: {original: [0,1,2, undefined, 3, null, 4]},
		output: '1,2,3,4'
	},
	{
		template: '{{filter original 2 }}',
		input: {original: [0,1,2, undefined, 3, null, 4]},
		output: '2'
	},
	{
		template: '{{#filter original 1 "a"}}|{{#each this}}{{@key}}:{{this}},{{/each}}|{{else}}no{{/filter}}',
		input: {original: [{a:1}, {b:2}, {a:1,b:2}, {}]},
		output: '|a:1,||a:1,b:2,|'
	},
	{
		template: '{{#filter original property="b"}}|{{#each this}}{{@key}}:{{this}},{{/each}}|{{else}}no{{/filter}}',
		input: {original: [{a:1}, {b:2}, {a:1,b:2}, {}]},
		output: '|b:2,||a:1,b:2,|'
	},
	{
		template: '{{#filter original}}|{{#each this}}{{@index}}:{{this}},{{/each}}|{{else}}no{{/filter}}',
		input: {original: [0,0,0]},
		output: 'no'
	},
	{
		template: '{{#filter original value=5}}|{{this}}|{{else}}no{{/filter}}',
		input: {original: [1,2,3]},
		output: 'no'
	}
]);