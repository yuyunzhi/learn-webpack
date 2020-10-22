## SourceMap

### 1、什么是SourceMap

先举个例子：
打开浏览器发现代码报错了。。。。现在知道dist目录下main.js 文件 96行出错。
用了sourceMap之后（它是一个映射关系），于是知道dist目录下main.js文件96行实际上对应的是src目录下index.js文件中的第1行

使用了sourceMap 打包速度是会变慢的。同时dist里多了一个xx.js.map文件，原理一个vlq集合

### 2、配置SourceMap

**常用的几个source-map的前缀**：

- Inline:inline-source-map 是把xx.js.map内容直接打包到xx.js里，用data url形式的方式放在末尾,会告诉你第几行第几列除了问题，很耗费性能

- Cheap:添加cheap-inline-source-map 可以精确到每一行不精确到每一列出错 ，可以降低打包时间，提高性能

- Module:如果要管第三方模块代码的映射可以加上module，可以加上cheap-module-inline-source-map

- Eval:eval是打包最快的方式 ，通过eval是执行效率最快、性能最好的方式，但是如果代码复杂的话，提示的内容可能不够全面，用eval的方式执行JS代码

### 3、最佳实践

开发环境：提示全，打包速度快

```
mode: 'development',
devtool: 'cheap-module-eval-source-map',
```

生产环境：提示效果会更好
```
mode: 'production',
devtool: 'cheap-module-source-map',
```