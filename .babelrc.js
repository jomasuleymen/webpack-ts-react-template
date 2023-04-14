module.exports = (api) => {
	api.cache(true);

	return {
		presets: [
			[
				"@babel/preset-env",
				{
					corejs: 3,
					useBuiltIns: "usage",
				},
			],
			[
				"@babel/preset-react",
				{
					development: process.env.NODE_ENV === "development",
				},
			],
			"@babel/preset-typescript",
		],
	};
};
