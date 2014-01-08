
hhn.load = function () {
	var args = [].slice.call(arguments),
		Handlebars = args.shift(),
		i = 0,
		c = args.length,
		helper;

	args = hhn.utils.flatten(args);
	c = args.length;

	// if no helpers were defined, load all of them.
	if (!c) {
		args = Object.keys(hhn.helpers);
		c = args.length;
	}

	for (;i < c; i++) {
		helper = hhn.helpers[args[i]](Handlebars, hhn.utils);
		Handlebars.registerHelper(args[i], helper);
	}
};
