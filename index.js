export default function classNames(...args) {
	return args
		.map((arg) => {
			// falsy value: undefined | null | false | 0 | ""
			if (!arg) {
				return "";
			}

			// string: "a"
			if (typeof arg === "string") {
				return arg;
			}

			// array: ["a", "b", "c"]
			if (Array.isArray(arg)) {
				return classNames(...arg);
			}

			// object with a custom toString method
			if (
				/* has a custom toString method */
				arg.toString !== Object.prototype.toString &&
				/* and is not a native toString */
				!arg.toString.toString().includes("[native code]")
			) {
				return arg.toString();
			}

			// object: {"a": false, "b": true}
			return Object.keys(arg)
				.filter((key) => arg[key] && arg.hasOwnProperty(key))
				.join(" ");
		})
		.filter((v) => !!v) // remove empty strings
		.join(" ");
}
