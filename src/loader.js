
hoard.load = function (Handlebars) {
	var args = [],
		i = 0,
		c,
		helper;

	(function descend(level) {
		if (Array.isArray(level)) {
			level.forEach(descend);
		} else {
			args.push(level);
		}
	})([].slice.call(arguments, 1));

	c = args.length;

	// if no helpers were defined, load all of them.
	if (!c) {
		args = Object.keys(hoard.helpers);
		c = args.length;
	}

	for (;i < c; i++) {
		helper = hoard.helpers[args[i]].call(context, Handlebars);
		Handlebars.registerHelper(args[i], helper);
	}
};
