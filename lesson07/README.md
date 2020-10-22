# 热更新替换 HMR

如果只是纯粹使用了webpack-dev-server那么当改变了代码，浏览器会自动刷新初始化数据。有时候比较麻烦。

有没有什么办法可以做到，**当修改了css只改变css的样式,js新增的数据不变。当修改了某一个模块的数据，另一个模块的数据不改变**。

### 配置如下

```
const webpack = require('webpack’);


devServer: {
     contentBase: './dist',
     open: true,
     port: 8080,
     hot: true, // 开启热更新的功能
     hotOnly: true // 即使HMR不生效，也不更新浏览器    
},

plugins: [
     new HtmlWebpackPlugin({
      template: 'src/index.html'
     }), 
     new CleanWebpackPlugin(['dist']),
     new webpack.HotModuleReplacementPlugin()
],
```

同时必须添加模块更新的代码

例如有两个模块，当改变了number模块，就更新number，counter模块不改变

```
import counter from './counter';
import number from './number';


counter();
number();


if(module.hot) {
 module.hot.accept('./number', () => {
  document.body.removeChild(document.getElementById('number'));
  number();
 })
}
```

css可以不写 module.hot判断 是因为css-loader已经实现了。如果一些特别的模块，就需要自己写一个module.hot来判断