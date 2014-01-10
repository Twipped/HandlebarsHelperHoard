
exports.stringify = function () {
	return function (input, options) {
		return JSON.parse(input);
	};
};