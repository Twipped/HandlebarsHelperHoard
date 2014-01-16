
var Handlebars = require('handlebars');
var HHN = require('../build/hoard.all.js').load(Handlebars);

function buildTestsAgainstData(data, testFunction) {
	var suite = {};
	var length = data.length;
	var name;
	for (var i=0; i<length; ++i) {
		name = JSON.stringify(data[i]);
		if (name.length > 20) {
			name = '#' + i + ': ' + name;
		} else {
			name = '#' + i;
		}
		suite[name] = (function(i){
			return function(test) {
				testFunction(test, data[i], i);
			};
		})(i);
	}

	return suite;
}

module.exports = function (data) {
	return buildTestsAgainstData(data, function (test, data) {
		var template = Handlebars.compile(data.template);
		var actual = template(data.input);
		var expected = data.output;

		test.strictEqual(actual, expected);

		test.done();
	});
};

module.exports.builder = buildTestsAgainstData;