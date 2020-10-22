# Production Development

### 1、如何切换开发环境和生产环境webpack配置


- 创建生产环境文件 ./build/webpack.prod.js
- 创建开发环境文件 ./build/webpack.dev.js
- 创建公共的代码文件 ./build/webpack.common.js

使用插件 webpack-merge 把配置文件合并

### 2、配置打包命令

package.json

```
"scripts": {
    "dev": "webpack-dev-server --config ./build/webpack.dev.js", // 启动热更新，选择dev配置文件
    "build": "webpack --config ./build/webpack.prod.js" // 直接打包，走prod配置文件
}
```