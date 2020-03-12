const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' )
const TerserWebpackPlugin = require( 'terser-webpack-plugin' )

const path = require( 'path' )

module.exports = {
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		watchContentBase: true
	},
	entry: { main: './src/js/index.js' },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [ 'babel-loader' ]
			},
			{
				test: /\.s(a|c)ss$/,
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
		filename: '[name].js',
		path: path.resolve( __dirname, 'dist' ),
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
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
		new CleanWebpackPlugin()
	],
	target: 'web',
}
