const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  resolveLoader: {
    modules:['node_modules','./loaders']
  },
  module: {
    rules: [{
      test: /\.js/,
      use: [{
        loader: 'replaceLoader', // 结合一下resolveLoader来定位loader代码在哪
      },
        {
          loader: 'replaceLoaderAsync',
          options: {
            name: 'hhh',
          }
        }
      ]
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}
