
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{jsfiddle "9fdLH"}}',
		output: '<iframe width="100%" height="300" src="http://jsfiddle.net/9fdLH/embedded/result,js,html,css/presentation/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>'
	}
]);