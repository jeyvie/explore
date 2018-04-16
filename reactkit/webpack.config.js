const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const sourcePath = path.join(__dirname, './src')

module.exports = function (env) {


  return {
    context: sourcePath,
    entry: './index.js',
    output: {
      path: path.resolve(process.cwd(), 'build'),
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
      new HtmlWebpackPlugin({
        template: './assets/index.html',//`${__dirname}/public/index.html`,
      })
    ]
  }
}