const path = require('path');
module.exports = {
  entry: './client/compiled/App.js',
  output: {
    path: path.resolve('client/public/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}