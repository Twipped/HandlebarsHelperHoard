
exports.gist = function (Handlebars) {
	return function (id) {
		id = Handlebars.Utils.escapeExpression(id);
		
		var result = '<script src="https://gist.github.com/' + id + '.js"></script>';
		
		return new Handlebars.SafeString(result);
	};
};