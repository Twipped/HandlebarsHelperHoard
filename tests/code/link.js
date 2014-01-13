
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{link "/assets/css/file.css"}}',
		output: '<link rel="stylesheet" href="/assets/css/file.css">'
	},
	{
		template: '{{link "/assets/less/file.less"}}',
		output: '<link rel="stylesheet/less" href="/assets/less/file.less">'
	},
	{
		template: '{{link "/assets/includes/file.html"}}',
		output: '<link rel="import" href="/assets/includes/file.html">'
	},
	{
		template: '{{link a}}',
		input: {a:['/assets/css/fileA.css', '/assets/css/fileB.css']},
		output: '<link rel="stylesheet" href="/assets/css/fileA.css">\n<link rel="stylesheet" href="/assets/css/fileB.css">'
	}
]);