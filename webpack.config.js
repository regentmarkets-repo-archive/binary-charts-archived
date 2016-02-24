var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/test.js'),

  output: {
    path: path.join(__dirname, 'example/'),
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ],
  },

  devtool: 'source-map'
};
