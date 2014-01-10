

exports.humanBytes = function (Handlebars) {
	return function (value) {
		var bytes = parseInt(value, 10);
		if (isNaN(bytes)) {
			console.error("Handlebars helper fileSize couldn't parse '" + value + "'");
			return value; // Graceful degradation
		}
		// KB is technically a Kilobit, but it seems more readable.
		var resInt, resValue;
		var metric = ['byte', 'bytes', 'KB', 'MB', 'GB'];
		if (bytes === 0) {
			resInt = resValue = 0;
		} else {
			// Base 1000 (rather than 1024) matches Mac OS X
			resInt = Math.floor(Math.log(bytes) / Math.log(1000));
			// No decimals for anything smaller than 1 MB
			resValue = (bytes / Math.pow(1000, Math.floor(resInt))).toFixed(resInt < 2 ? 0 : 1);
			if (bytes === 1) {
				resInt = -1; // special case: 1 byte (singular)
			}
		}
		return new new Handlebars.SafeString(resValue + ' ' + metric[resInt + 1]);
	};
};