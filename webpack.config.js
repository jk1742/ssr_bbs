const path = require('path');
const webpack = require("webpack");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify("Contents Viewer"),
      VERSION: JSON.stringify("v0.1"),
    }),
    new webpack.ProvidePlugin({
      _:"lodash",
      axios:"axios",
      $SR: path.resolve(path.join(__dirname, '/plugins/Utilities')),
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9001,
  }

};

