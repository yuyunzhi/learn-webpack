const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 10240
        }
      }
    },{
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options:{
            importLoaders: 2,// 表示scss文件导入了scss文件依然走postcss-loader sass-loader
            modules:true // 开启css模块化
          }
        },
        'sass-loader',
        'postcss-loader'
      ]
    }]
  },
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}