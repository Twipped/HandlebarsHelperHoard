
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{script "/assets/js/file.js"}}',
		output: '<script src="/assets/js/file.js"></script>'
	},
	{
		template: '{{script "/assets/coffee/file.coffee"}}',
		output: '<script type="text/coffeescript" src="/assets/coffee/file.coffee"></script>'
	},
	{
		template: '{{script "/assets/templates/file.hbs"}}',
		output: '<script type="text/handlebars" src="/assets/templates/file.hbs"></script>'
	},
	{
		template: '{{script a}}',
		input: {a:['/assets/js/fileA.js', '/assets/js/fileB.js']},
		output: '<script src="/assets/js/fileA.js"></script>\n<script src="/assets/js/fileB.js"></script>'
	}
]);