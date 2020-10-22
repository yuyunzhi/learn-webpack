# webpackDevServer

### 如何解决每次手动打包，手动启动浏览器刷新页面更新代码？

- webpack —watch

在package.json 里 script 添加

```
"watch": "webpack --watch"
```

优点：监听到源代码改变，会自动打包
缺点：需要手动刷新页面

- webpack-dev-server

在package.json 里 script 添加

```
"start": "webpack-dev-server",
```

在devDependencies安装

```
"webpack-dev-server": "^3.1.10"
```

优点：监听到源代码改变，会自动打包，自动启动服务器，自动更新浏览器
最佳实践

注意使用了webpack-dev-server打包后就不会目录里有dist了，而是放在电脑某个内存里，可以提高效率。

### 启动时自动打开浏览器

配置

```
devServer: {
     contentBase: './dist',
     open: true, // 默认启动开启浏览器
     port: 8080, // 端口设置为8080
},
```
