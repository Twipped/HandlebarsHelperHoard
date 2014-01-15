

exports.humanBytes = function (Handlebars) {
	return function (value) {
		var bytes = Math.abs(parseInt(value, 10));
		if (isNaN(bytes)) {
			console.error("Handlebars helper fileSize couldn't parse '" + value + "'");
			return value; // Graceful degradation
		}
		
		var resInt, resValue;
		var metric = ['byte', 'bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) {
			resInt = resValue = 0;
		} else {
			// Base 1000 (rather than 1024) matches Mac OS X
			resInt = Math.floor(Math.log(bytes) / Math.log(1000));
			// No decimals for anything smaller than 1 MB
			resValue = (bytes / Math.pow(1000, Math.floor(resInt)));
			//only show a decimal place if the decimal will round to something other than .0
			resValue = resValue.toFixed(resValue % 1 > 0.1 ? 1 : 0)
			if (bytes === 1) {
				resInt = -1; // special case: 1 byte (singular)
			}
		}
		if (resInt + 1 < metric.length) {
			return resValue + ' ' + metric[resInt + 1];
		} else {
			//The number we have is higher than our highest unit, so express it as a value of our highest unit
			return resValue * Math.pow(10, metric.length + 2 - resInt) + ' ' + metric[metric.length - 1];
		}
		
	};
};