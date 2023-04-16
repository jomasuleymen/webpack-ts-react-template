import path from "path";
import webpack from "webpack";
import Dotenv from "dotenv-webpack";
import { PROJECT_ROOT, commonConfig } from "./webpack.common";
import { merge } from "webpack-merge";

import HtmlWebpackPlugin from "html-webpack-plugin";

const PORT = 3000;

export default merge(commonConfig, {
	mode: "development",
	output: {
		filename: "[name].bundle.js",
		path: path.join(PROJECT_ROOT, "dev_build"),
	},
	devtool: "inline-source-map",
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(PROJECT_ROOT, "public", "index.html"),
			inject: "body",
		}),
		new webpack.HotModuleReplacementPlugin(),
		new Dotenv({
			path: path.join(PROJECT_ROOT, ".env.development"),
			systemvars: true,
		}),
	],
	devServer: {
		hot: true,
		port: PORT,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
			},
		],
	},
});
