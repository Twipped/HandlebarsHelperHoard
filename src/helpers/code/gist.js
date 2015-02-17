
exports.gist = function (Handlebars) {
	/**
	 * Creates a Github Gist embed
	 * @category code
	 * @signature {{gist gistId}}
	 * @param  {string|integer} gistId Gist id
	 */
	return function gist (gistId) {
		gistId = Handlebars.Utils.escapeExpression(gistId);
		
		var result = '<script src="https://gist.github.com/' + gistId + '.js"></script>';
		
		return new Handlebars.SafeString(result);
	};
	/***/
};
