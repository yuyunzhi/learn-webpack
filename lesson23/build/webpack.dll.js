const path = require('path')
const webpack = require('webpack')
module.exports = {
  mode:'production',
  entry:{
    vendors:['lodash'],
    react:['react','react-dom']
  },
  output:{
    filename:'[name].dll.js',
    path:path.resolve(__dirname, '../dll'),
    library:'[name]' // 然后暴露出来，用变量vendors访问
  },
  plugins:[
      new webpack.DllPlugin({
        name: '[name]',
        path:path.resolve(__dirname,'../dll/[name].manifest.json')
      })
  ]
}
