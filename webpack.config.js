const
  path = require('path'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  webpack = require('webpack');

module.exports = {
  entry: './client/components/index.jsx',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/public/dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['env', 'react'] },
        }],
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        CLOUD_NAME: JSON.stringify(process.env.CLOUD_NAME),
        DB_PORT: JSON.stringify(process.env.DB_PORT),
        CLOUDINARY_UPLOAD_PRESET: JSON.stringify(process.env.CLOUDINARY_UPLOAD_PRESET),
        CLOUDINARY_UPLOAD_URL: JSON.stringify(process.env.CLOUDINARY_UPLOAD_URL),
        IMAGE_URL: JSON.stringify(process.env.IMAGE_URL),
        DEV_MODE: JSON.stringify(process.env.DEV_MODE)
      }
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      compress: {
        warnings: false
      }
    })
  ]
};
