module.exports = (ctx) => {
	return {
		plugins: [
			require('autoprefixer')({
				"overrideBrowserslist": ["last 2 versions","not IE 11"],
				// grid: 'autoplace'
			}),
			require("postcss-import")({addDependencyTo: ctx.webpack}),
		],
		sourceMap: true,
		parser: "postcss-scss",
	}
};