const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 10240
        }
      }
    }, {
      test: /\.(eot|ttf|svg)$/,
      use: {
        loader: 'file-loader'
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['../dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new AddAssetHtmlWebpackPlugin({ // 在html里添加新的静态资源 script 引入
      filepath:path.resolve(__dirname,'../dll/vendors.dll.js')
    }),
     new webpack.DllReferencePlugin({ // 在映射表里找到对应的第三方模块使用全局变量使用，而不是直接从node_modules里找
        manifest:path.resolve(__dirname,'../dll/vendors.manifest.json')
      })
  ],
  optimization: {
    usedExports: true, // tree shaking 使用
    splitChunks: {
      chunks: 'all',
    }
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',// 间接引入打包的走这个地方
    path: path.resolve(__dirname, '../dist')
  }
}
