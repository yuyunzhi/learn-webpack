# 对CSS代码分割

正常打包的话，会把CSS文件一起打包的main.js文件，如何进行CSS代码分割呢？

### 1、使用一个插件：mini-css-extract-plugin

但这个插件有一个缺点，目前不支持热更新，所以适合线上环境做打包

配置方式安装依赖

```
yarn add mini-css-extract-plugin
```

**在生产环境**的webpack.config.js配置

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

  module:{
    rules:[
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css", //index.html直接引入的文件
      chunkFilename: "id.css" // 间接引用的文件
    })
  ]
```

**注意** 如果此时使用了tree shaking 看看 package.json 里 sideEffects 配置。如果为false那么css代码是没有分割的。需要把css tree shaking排除在外。修改如下：

```
 "sideEffects": [
    "*.css"
  ],
```

### 2、接下来对合并的CSS代码压缩

安装依赖

```
yarn add optimize-css-assets-webpack-plugin -D
```

生产环境

```
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

optimization:{
    minimizer:[new OptimizeCSSAssetsPlugin({})]
}

```


