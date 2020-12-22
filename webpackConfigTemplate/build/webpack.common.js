const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  }),
  new CleanWebpackPlugin(['../dist'], {
    root: path.resolve(__dirname, '../')
  })
]

const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
files.forEach(file => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({ // 在html里添加新的静态资源 script 引入
      filepath: path.resolve(__dirname, '../dll', file)
    }))
  }

  if (/.*\.manifest.json/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({ // 在映射表里找到对应的第三方模块使用全局变量使用，而不是直接从node_modules里找
      manifest: path.resolve(__dirname, '../dll/', file)
    }))
  }
})

module.exports = {
  entry: {
    main: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', 'ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_moudles/
      },
      {
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
  plugins,
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
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',// 间接引入打包的走这个地方
    path: path.resolve(__dirname, '../dist')
  }
}
