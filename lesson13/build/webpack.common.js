const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
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
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
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
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['../dist'], {
      root: path.resolve(__dirname, '../')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // async 表示只对异步代码分割，initial 表示只对同步代码分割，all的话是所有同时会走到cacheGroups.vendors
      minSize: 30000, // 表示最小模块大于30000个字节才会做代码分割
      // maxSize: 50000, // 如果拆分的代码大小超过50000,会进行二次拆分，一般配置的比较少
      minChunks: 1,//引入几次才分割打包，如果只引入1次就分割，如果是2表示必须大于等于2次才做代码分割
      maxAsyncRequests: 5,// 表示不能超过5个模块分割，超过后面的模块就不分割了
      maxInitialRequests: 3,// 表示整个网站首页或入口文件 如果做代码分割不超过3个
      automaticNameDelimiter: '~', //组和文件名链接符号 vendors~main.js
      name: true,// 表示要更新名字，一般是不需要改变的
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 如果在node_modules里，那么会打包到vendors.js
          priority: -10, // 比如jquery 符合vendors 也符合default，值越大，说明优先级更大
          filename:'vendors.js' // 表示所有的第三方打包到一个叫vendors.js文件
        },
        default: { // 如果是引入自己在项目里写的模块引入走这里，非node_modules
          // minChunks: 2,
          priority: -20,// 值越大，说明优先级更大
          reuseExistingChunk: true, // 如果代码已经打包过，重复引用时就不会再分割打包，而是复用之前的。
          filename: 'common.js'
        }
      }
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  }
}