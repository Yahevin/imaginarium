module.exports = (ctx) => {
	return {
		plugins: [
			require('autoprefixer')({
				"overrideBrowserslist": [
					"last 4 versions"
				],
				grid: 'autoplace'
			}),
			require("postcss-import")({addDependencyTo: ctx.webpack}),
		],
		sourceMap: true,
		parser: "postcss-scss",
	}
};