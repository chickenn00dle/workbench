const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' )
const Path = require( 'path' )
const TerserWebpackPlugin = require( 'terser-webpack-plugin' )
const WebpackMd5Hash = require( 'webpack-md5-hash' )

module.exports = {
	devServer: {
		contentBase: './dist'
	},
	entry: { main: './src/js/index.js' },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
			}
		]
	},
	optimization: {
		minimizer: [ 
			new OptimizeCssAssetsPlugin(),
			new TerserWebpackPlugin( { sourceMap: true } )
		]
	},
	output: {
		filename: '[name].[chunkhash].js',
		path: Path.resolve( __dirname, 'dist' )
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			hash: true,
			inject: false,
			minify: {
				collapseWhitespace: true,
				removeComments: true,
			},
			template: './src/index.html'
		}),
		new WebpackMd5Hash(),
		new CleanWebpackPlugin()
	],
	target: 'node',
}
