
exports.filter = function (Handlebars) {
	/**
	 * Filters a passed array, depending on the arguments provided.
	 * May be used inline or as an iterator. Else condition evaluates if result is empty.
	 *
	 * @category collections
	 * @signature {{filter input}} or {{#filter input}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/filter}}
	 * @describe Filter all falsy items (`0`, `''`, `false`, `null`, `undefined`, etc).
	 * @param {array<mixed>} input
	 * @return {array}
	 * @example
	 * // items = [0, 1, null, 'test']
	 * {{#filter items}}<p>{{this}}</p>{{/filter}}
	 * // Result: <p>1</p><p>test</p>
	 *
	 * @signature {{filter input value}} or {{#filter input value}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/filter}}
	 * @describe Filter all items matching the passed value. Else condition evaluates if result is empty.
	 * @param {array<mixed>} input
	 * @param {mixed} value Value to filter.
	 * @return {array}
	 * @example
	 * // items = [0, 1, 2]
	 * {{#filter items 1}}<p>{{this}}</p>{{/filter}}
	 * // Result: <p>0</p><p>2</p>
	 *
	 * @signature {{filter input value property}} or {{#filter input value property}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/filter}}
	 * @describe Performs a pluck operation, filtering all objects from the array where the provided property name does not match the provided value. (`O[n][property] != value`)
	 * @param {array<mixed>} input
	 * @param {mixed} value Value to filter.
	 * @param {property} [string] Object property name to check against the value
	 * @return {array}
	 * @example
	 * // original = [{a:1}, {b:2}, {a:1,b:2}, {}]
	 * {{#filter original 1 "a"}}|{{#each this}}<span>{{@key}}:{{this}}</span>{{/each}}|{{else}}no{{/filter}}
	 * // Result: '|<span>a:1</span>||<span>a:1</span><span>b:2</span>|'
	 *
	 * @example
	 * // Property and value may be provided as named arguments
	 * // original = [{a:1}, {b:2}, {a:1,b:3}, {}]
	 * {{#filter original property="b" value=2}}|{{#each this}}<span>{{@key}}:{{this}}</span>{{/each}}|{{else}}no{{/filter}}
	 * // Result: '|<span>b:2</span>|'
	 *
	 * @signature {{filter input property=key}} or {{#filter input property=key}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/filter}}
	 * @describe If a property is defined, but not a value, the function will filter all objects from the array where the provided property name is falsy or absent (`0`, `''`, `false`, `null`, `undefined`, etc).
	 * @param {array<mixed>} input
	 * @param {property} [string] Object property name to check against the value
	 * @return {array}
	 * @example
	 * // original = [{a:0}, {b:2}, {a:1,b:2}, {}]
	 * {{#filter original property="a"}}|{{#each this}}<span>{{@key}}:{{this}}</span>{{/each}}|{{else}}no{{/filter}}
	 * // Result: '|<span>a:1</span><span>b:2</span>|'
	 */
	return function filter (input, value, property, options) {

		options = arguments[arguments.length - 1];

		var condition = function (d) { return d; };

		switch (arguments.length) {
		case 1:
			throw new Error('Handlebars Helper "filter" needs at least 1 parameter');
		case 2:
			property = options.hash && options.hash.property;
			value = options.hash && options.hash.value;

			if (property && value) {
				condition = function (d) { return d[property] == value; };
			} else if (property) {
				condition = function (d) { return !!d[property]; };
			} else if (value) {
				condition = function (d) { return d !== value; };
			}
			break;
		case 3:
			condition = function (d) { return d !== value; };
			break;

		default:
			condition = function (d) { return d[property] == value; };
			break;
		}

		var results = input.filter(condition);

		if (!options.fn) return results;

		if(results && results.length > 0) {
			var data = Handlebars.createFrame(options.data);
			return results.map(function (result, i) {
				data.index = i;
				data.first = (i === 0);
				data.last  = (i === results.length - 1);
				return options.fn(result, {data: data});
			}).join('');
		} else {
			return options.inverse(this);
		}

	};
	/***/
};
