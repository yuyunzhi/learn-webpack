const path = require('path');

module.exports = {
  mode: "development", // production 表示打包的文件会被压缩，development 表示不压缩
	entry: {
	  main:'./src/index.js'
  },
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'bundle')
	}
}