
var makeTests = require('../testBuilder.js');
var Handlebars = require('handlebars');

Handlebars.registerPartial('testingPartial1', '<div>yes</div>');
Handlebars.registerPartial('testingPartial2', '<div>{{#block "target"}}yes{{/block}}</div>');
Handlebars.registerPartial('testingPartial3', '<div>{{block "target"}}</div>');
Handlebars.registerPartial('testingPartial4', '<div>{{{block "target"}}}</div>');
Handlebars.registerPartial('testingPartial5', '<div>{{#block "title"}}<h1>{{#block "titleText"}}Title{{/block}}</h1>{{/block}}</div>');

module.exports = makeTests([
	{
		template: ' {{extend "testingPartial1"}}',
		output: ' <div>yes</div>'
	},
	{
		template: ' {{{extend "testingPartial1"}}}',
		output: ' <div>yes</div>'
	},

	{
		template: ' {{#extend "testingPartial2"}}{{/extend}}',
		output: ' <div>yes</div>'
	},

	{
		template: ' {{#extend "testingPartial3"}}{{#content "target"}}<br>{{/content}}{{/extend}}',
		output: ' <div><br></div>'
	},
	{
		template: ' {{#extend "testingPartial4"}}{{#content "target"}}<br>{{/content}}{{/extend}}',
		output: ' <div><br></div>'
	},
	{
		template: ' {{#extend "testingPartial5"}}{{#content "titleText"}}Hello!{{a}}{{/content}}{{/extend}}',
		input: {a:'<br>'},
		output: ' <div><h1>Hello!&lt;br&gt;</h1></div>'
	},
	{
		template: ' {{#extend "testingPartial5"}}{{#content "title" "append"}}Hello!{{a}}{{/content}}{{/extend}}',
		input: {a:'<br>'},
		output: ' <div><h1>Title</h1>Hello!&lt;br&gt;</div>'
	},
	{
		template: ' {{#extend "testingPartial5"}}{{#append "title"}}Hello!{{a}}{{/append}}{{/extend}}',
		input: {a:'<br>'},
		output: ' <div><h1>Title</h1>Hello!&lt;br&gt;</div>'
	},
	{
		template: ' {{#extend "testingPartial5"}}{{#prepend "title"}}Hello!{{a}}{{/prepend}}{{/extend}}',
		input: {a:'<br>'},
		output: ' <div>Hello!&lt;br&gt;<h1>Title</h1></div>'
	},
]);
