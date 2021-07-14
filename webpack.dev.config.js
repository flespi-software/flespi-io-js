var path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './example/browser/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    open: 'Google Chrome'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'example/browser/index.html',
      inject: true
    })
  ],
  performance: {
    hints: false
  }
}
