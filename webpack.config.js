const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'axios', 'lodash', 'prop-types', 'react', 'react-autocomplete',
  'react-dom', 'react-redux', 'react-router', 'react-router-dom',
  'react-widgets', 'reactjs-popup', 'redux', 'redux-form',
  'redux-promise', 'redux-thunk',
];

const config = {
  entry: {
    bundle: './src/index.jsx',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.(js|jsx?)$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
      {
        use: 'url-loader?name=[name].[ext]',
        test: /\.(gif|ttf|eot|svg|woff2?|ico)$/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new Dotenv(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'favicon.ico',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: true,
  },
};

module.exports = config;
