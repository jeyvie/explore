const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const sourcePath = path.join(__dirname, './src')

module.exports = function (env) {


  return {
    context: sourcePath,
    entry: './index.js',
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: './'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            // options: options.babelQuery,
          },
        },
        {
          // Preprocess 3rd party .css files located in node_modules
          test: /\.css$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['build']),
      new HtmlWebpackPlugin({
        template: './assets/index.html',//`${__dirname}/public/index.html`,
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: path.join(__dirname, "build"),
      compress: false,
      publicPath: '/',
      port: 9000,
      hot: true
    }
  }
}