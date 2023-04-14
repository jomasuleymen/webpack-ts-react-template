const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PROJECT_ROOT = path.join(__dirname, "..");
const SOURCE_PATH = path.join(PROJECT_ROOT, "src");

module.exports = {
	PROJECT_ROOT,
	SOURCE_PATH,
	commonConfig: {
		entry: path.join(SOURCE_PATH, "index.tsx"),
		resolve: {
			extensions: [".tsx", ".ts", ".jsx", ".js"],
			alias: {
				"@public": path.join(PROJECT_ROOT, "public"),
				"@store": path.join(SOURCE_PATH, "store"),
				"@styles": path.join(SOURCE_PATH, "styles"),
				"@pages": path.join(SOURCE_PATH, "pages"),
				"@components": path.join(SOURCE_PATH, "components"),
			},
			symlinks: false,
			cacheWithContext: false,
		},
		plugins: [
			new webpack.ProvidePlugin({
				React: "react",
			}),
			new CleanWebpackPlugin(),
		],
		module: {
			rules: [
				{
					test: /\.(js|ts)x?$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
					},
				},
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: "asset/resource",
				},
				{
					test: /\.(html)$/,
					exclude: /node_modules/,
					use: ["html-loader"],
				},
			],
		},
	},
};
