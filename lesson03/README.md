# 使用loader打字体

### 打包字体 

打包字体 在module里添加
```
{
    test: /\.(eot|ttf|svg)$/,
    use: {
      loader: 'file-loader'
    }
}
```

**plugins是在某个时刻做一件事，刚打包、打包结束，打包中间**

### 使用plugins html-webpack-plugin、clean-webpack-plugin

plugins html-webpack-plugin：在打包结束时，在dist自动生成html，并且把打包的bundle.js自动引入html

clean-webpack-plugin：在每次打包生成的dist文件，先删除里面的内容

```
npm install html-webpack-plugin clean-webpack-plugin -D
```

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin’);

plugins: [new HtmlWebpackPlugin({
  template: 'src/index.html' // 参考模板为 src/index.html
}), new CleanWebpackPlugin(['dist'])],
```