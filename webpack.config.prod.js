var path = require('path');
var webpack = require('webpack');
var invariant = require('invariant');

const SOCKET_IO_SERVER = process.env.SOCKET_IO_SERVER || require('./keys').SOCKET_IO_SERVER;

invariant(
  SOCKET_IO_SERVER && SOCKET_IO_SERVER !== null && typeof SOCKET_IO_SERVER !== 'undefined',
  `Socket.io server location is not defined on the client side, please provide a
   valid Socket.io URL. This can be provided as process.env.SOCKET_IO_SERVER or
   in a keys.js file in the application root folder.`
);

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      '__SOCKET_IO_SERVER__': JSON.stringify(SOCKET_IO_SERVER)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint-loader'],
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'shared')
        ]
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
};
