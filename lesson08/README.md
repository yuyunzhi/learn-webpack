# 使用Babel处理ES6语法

### 安装依赖 

```
npm install —save-dev babel-loader @babel/core @babel/preset-env
```

- babel-loader : 提供识别模块的打包工具

- @babel/core : 识别js代码转化为AST抽象语法树，编译转化成新的语法

- @babel/preset-env : 把ES6代码转化为ES5语法，提供了翻译规则

### 打包方式

二选一

#### 1、安装@babel/profill

```
npm install -save-dev @babel/profill
```

缺点：这个会出现全局污染

配置规则

```
rules:[{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options:{
    presets: [['@babel/preset-env', {
      targets: {
        chrome: "67",
      },
      useBuiltIns: 'usage' // 表示做polyfill 根据业务代码来加对应的代码，可以减少打包的体积
    }]]
  }
}],
```

注意：useBuiltIns: 'usage' 表示按需引入

### 2、安装 @babel/plugin-transform-runtime

```
npm install -save-dev @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs2
```

优点：可是使用闭包的方式不影响其他环境变量

配置 创建.babelrc

```
{
 "plugins": [["@babel/plugin-transform-runtime", {
  "corejs": 2, // 使用了2 就需要安装 @babel/runtime-corejs2
    "helpers": true,
    "regenerator": true,
    "useESModules": false
 }]]
}
```

webpack.config.js

```
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
}
```




