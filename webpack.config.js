var webpack = require('webpack')
var path = require('path')
var Dotenv = require('dotenv-webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const VENDOR_LIBS = [
  'react', 'lodash', 'redux', 'react-redux', 'react-dom',
  'axios', 'redux-form', 'react-router', 'react-router-dom',
  'redux-promise'
]

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        use: 'url-loader?name=[name].[ext]',
        test: /\.(gif|ttf|eot|svg|woff2?)$/
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: true
  }
}

module.exports = config
