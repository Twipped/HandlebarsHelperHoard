
var testBuilder = require('../testBuilder.js').builder;
var Handlebars = require('handlebars');
var HHN = require('../../build/hoard.all.js').load(Handlebars);


var makeTests = function (data) {
	return testBuilder(data, function (test, data) {
		var template = Handlebars.compile(data.template);
		var actual, good = true, i = 10000;

		//run the random call many times to make sure we have a safe sample size
		while (i--) {
			actual = parseInt(template(data.input),10);
			good = good && actual >= data.low && actual <= data.high;
		}

		test.ok(good);

		test.done();
	});
};

module.exports = makeTests([
	{
		template: '{{random}}',
		low: 0, high: 1
	},
	{
		template: '{{random a}}',
		input: {a:100},
		low: 0, high: 100
	},
	{
		template: '{{random a b}}',
		input: {a:1000, b:1100},
		low: 1000, high: 1100
	},
	{
		template: '{{random a b}}',
		input: {a:-1000, b:1000},
		low: -1000, high: 1000
	}
]);