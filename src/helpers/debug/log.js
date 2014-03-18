
exports.log = function () {
	return function (value, options) {
		if (arguments.length === 1) {
			console.log(this);
		} else {
			var args = [].slice.call(arguments, 0, arguments.length - 1);
			console.log(args);
		}
	};
};