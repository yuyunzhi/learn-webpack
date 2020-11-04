const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const prodConfig = {
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  module:{
    rules:[
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization:{
    minimizer:[new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css", // 表示直接引入的文件
      chunkFilename: "[id].css" // 间接引入的文件
    })
  ],
  output: {
    filename: '[name].[contentHash].js',
    chunkFilename: '[name].[contentHash].js'
  }
}

module.exports = prodConfig