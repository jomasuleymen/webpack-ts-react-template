const path = require("path");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const { PROJECT_ROOT, SOURCE_PATH, commonConfig } = common;
module.exports = merge(commonConfig, {
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
