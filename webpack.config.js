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
};
