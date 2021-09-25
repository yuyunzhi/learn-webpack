const path = require('path')
const FileListPlugin = require('./plugin/FileListPlugin')
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  plugins:[
      new FileListPlugin({
          name: 'yuyunzhi'
      })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}
