const path = require('path')
const CopyRightWebpackPlugin = require('./plugin/copyright-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  plugins:[
      new CopyRightWebpackPlugin({
          name: 'yuyunzhi'
      })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}
