const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')

const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')

const commonConfig = {
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader'
        }
      ]
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      _join: ['lodash', 'join']
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    usedExports: true, // tree shaking 使用
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 如果在node_modules里，那么会打包到vendors.js
          priority: -10, // 比如jquery 符合vendors 也符合default，值越大，说明优先级更大
          filename: 'vendors.[contentHash].js' // 表示所有的第三方打包到一个叫vendors.js文件
        },
        default: { // 如果是引入自己在项目里写的模块引入走这里，非node_modules
          // minChunks: 2,
          priority: -20,// 值越大，说明优先级更大
          reuseExistingChunk: true, // 如果代码已经打包过，重复引用时就不会再分割打包，而是复用之前的。
          filename: 'common.[contentHash].js'
        }
      }
    }
  },
  performance: false,//表示不提示性能问题
  output: {
    path: path.resolve(__dirname, '../dist')
  }
}

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}