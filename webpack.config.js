var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackConfigPlugin = new HTMLWebpackPlugin({
  template: __dirname + 'app/index.html',
  filename: 'index.html',
  inject: 'head',
});
module.exports = {
  entry: __dirname + 'app/index.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/dist',
  },
  plugins: [HTMLWebpackConfigPlugin],
};
