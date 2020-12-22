# webpack性能优化

## 1、提升打包速度

### 跟上技术的迭代（Node,Npm,Yarn）

因为webpack是运行在Node环境，版本尽可能的新

### 尽可能少的模块上应用的Loader，降低loader使用的频率

比如合理使用 include exclude   node_modules 因为第三方库已经被编译过了不需要再走一遍

```
{ 
     test: /\.js$/, 
     exclude: /node_modules/, // include:path.resolve(__dirname, '../src')
     loader: 'babel-loader',
}
```


### 尽可能精简plugin的使用，同时确保可靠性

### resolve参数合理配置

extensions：

```
  resolve:{
      extensions:['.js','.jsx']
  },
```

```
import child from './child'
```
表示当我引入的文件没有写后缀，会先去寻找.js文件，找不到就会找.jsx文件，所以extensions,不要配置太多，否则每次引入，都需要对所有的extensions进行循环遍历

.css .png这些就不要引入到extensions了

alias:(别名)

```
  resolve:{
      extensions:['.js','.jsx'],
      alias:{
        xxx:path.resolve(__dirname,'../src/child')
      }
  },
```

```
import child from 'xxx'
```

### 使用DllPlugin提高打包速度

目标：
- 第三方模块只打包一次
- 项目里使用第三方模块，使用dll文件里的模块

创建webpack.dll.js

```
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode:'production',
  entry:{
    vendors:['react','react-dom','lodash']
  },
  output:{
    filename:'[name].dll.js',
    path:path.resolve(__dirname, '../dll'),
    library:'[name]' // 然后暴露出来，用变量vendors访问
  },
  plugins:[
      new webpack.DllPlugin({
        name: '[name]', //生成一个第三方模块的映射表
        path:path.resolve(__dirname,'../dll/[name].manifest.json') 
      })
  ]
}
```

package.json添加build:dll

```
"build:dll": "webpack --config ./build/webpack.dll.js"
```

在webpack.common.js里添加plugin插件使得打包的dll/vendors.dll.js能够引入到html里，并且有一个全局变量vendors访问

```

const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

....

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['../dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new AddAssetHtmlWebpackPlugin({ // 在html里添加新的静态资源 script 引入
      filepath:path.resolve(__dirname,'../dll/vendors.dll.js')
    }),
     new webpack.DllReferencePlugin({ // 在映射表里找到对应的第三方模块，而不是直接从node_modules里找
        manifest:path.resolve(__dirname,'../dll/vendors.manifest.json')
      })
  ]

...
```

运行 yarn dev 查看页面的html

```
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>html 模版</title>
    </head>
    <body>
        <div id='root'></div>
        //多出了vendors.dll.js
        <script type="text/javascript" src="vendors.dll.js"></script>
        <script type="text/javascript" src="vendors~main.chunk.js"></script>
        <script type="text/javascript" src="main.js"></script>
    </body>
</html>
```





