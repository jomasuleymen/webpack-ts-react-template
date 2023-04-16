import path from "path";
import Dotenv from "dotenv-webpack";
import webpack from "webpack";
import { PROJECT_ROOT, commonConfig } from "./webpack.common";
import { merge } from "webpack-merge";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";

export default merge(commonConfig, {
	mode: "production",
	output: {
		path: path.join(PROJECT_ROOT, "prod_build"),
		filename: "[name].[contenthash].bundle.js",
		publicPath: "/",
		clean: true,
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
		usedExports: true,
		runtimeChunk: "single",
		minimize: true,
		minimizer: [
			new TerserWebpackPlugin({
				parallel: true,
			}),
			new CssMinimizerPlugin(),
			new HtmlWebpackPlugin({
				template: path.join(PROJECT_ROOT, "public", "index.html"),
				minify: {
					removeAttributeQuotes: true,
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeStyleLinkTypeAttributes: true,
					keepClosingSlash: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				},
			}),
		],
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
		new Dotenv({
			path: path.join(PROJECT_ROOT, ".env"),
			systemvars: true,
		}),
	],
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
				type: "asset",
			},
			{
				test: /\.(sc|c)ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
			},
		],
	},
});
