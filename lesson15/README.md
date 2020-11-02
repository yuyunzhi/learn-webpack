# 打包分析



生成webpack打包分析json

```
webpack --profile --json > stats.json --config ./build/webpack.dev.js
```

然后把生成的stats.json放入相关的分析网站就可以看到可视化的数据。当然也可以配置analyzer

安装依赖

```
npm install webpack-bundle-analyzer --save-dev
```

在webpack.config.js配置

```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = {
  ...
  configureWebpack: {
    plugins: [
        new BundleAnalyzerPlugin({
                    //  可以是`server`，`static`或`disabled`。
                    //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
                    //  在“静态”模式下，会生成带有报告的单个HTML文件。
                    //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
                    analyzerMode: 'server',
                    //  将在“服务器”模式下使用的主机启动HTTP服务器。
                    analyzerHost: '127.0.0.1',
                    //  将在“服务器”模式下使用的端口启动HTTP服务器。
                    analyzerPort: 8888, 
                    //  路径捆绑，将在`static`模式下生成的报告文件。
                    //  相对于捆绑输出目录。
                    reportFilename: 'report.html',
                    //  模块大小默认显示在报告中。
                    //  应该是`stat`，`parsed`或者`gzip`中的一个。
                    //  有关更多信息，请参见“定义”一节。
                    defaultSizes: 'parsed',
                    //  在默认浏览器中自动打开报告
                    openAnalyzer: true,
                    //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
                    generateStatsFile: false, 
                    //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
                    //  相对于捆绑输出目录。
                    statsFilename: 'stats.json',
                    //  stats.toJson（）方法的选项。
                    //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
                    //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
                    statsOptions: null,
                    logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
        })
    ]
  }, 
  ...
};
```

使用方式 在打包或者启动的时候加 --report

```
npm run serve --report
npm run build --report
```

# prefetching && preloading

关注代码使用率：一开始不会执行的代码不要加载出来，而是当交互了再去加载。

webpack希望尽可能使用异步加载模快在第一次加载提高性能，而同步是第二次加载了增加缓存对性能的提升是有限的。

```
document.addEventListener('click', () => {
  import('./click.js').then(({default:func}) => {
    func()
  })
})

```

**注意** 但这样会存在一个问题，就是当用户点击交互了才下载代码可能会有一点小小的延迟，如何解决这个问题？

解决方案就是 ： prefetching/preloading

- prefetching 会等到核心先展示的代码加载完毕了，等宽带空闲再继续下载。

只需要在代码添加如下内容即可：

```
document.addEventListener('click', () => {
  import(/* webpackPrefetch:true */'./click.js').then(({default:func}) => {
    func()
  })
})
```

当用户点击了，仍然会下载click.js文件，但是使用的时间会非常短，因为之前已经下载过了有了缓存了。

- preloading 会和主的代码同时下载。

```
document.addEventListener('click', () => {
  import(/* webpackPreload:true */'./click.js').then(({default:func}) => {
    func()
  })
})
```

因此性能优化最好去考虑代码的使用率更高。




