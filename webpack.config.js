const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackConfigPlugin = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, 'public/index.html'),
  filename: 'index.html',
  inject: true,
});

module.exports = function (_env, argv) {
  const isProduction = argv.mode === 'production';
  const isDevelopment = !isProduction;

  return {
    devtool: isDevelopment && 'cheap-module-source-map', // Enable source Map generation in development mode
    entry: './src/index.js', // The Main Entry Point
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? 'production' : 'development',
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'), // root dir to store output files
      filename: 'assets/js/[name].[contenthash:8].js', // pattern to specify generated file names
      publicPath: '/', // The Path to root directory where all files will be deployed.
    },
    plugins: [
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'assets/css/[name].[contenthash:8].css',
          chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
        }),
      HTMLWebpackConfigPlugin,
    ].filter(Boolean),
  };
};
