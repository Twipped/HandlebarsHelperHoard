
var makeTests = require('./testBuilder.js');

exports['gist'] = makeTests([
	{
		template: '{{gist 8251885}}',
		output: '<script src="https://gist.github.com/8251885.js"></script>'
	}
]);

exports['jsfiddle'] = makeTests([
	{
		template: '{{jsfiddle "9fdLH"}}',
		output: '<iframe width="100%" height="300" src="http://jsfiddle.net/9fdLH/embedded/result,js,html,css/presentation/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>'
	}
]);