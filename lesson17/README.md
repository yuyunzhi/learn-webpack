# webpack与浏览器缓存（caching）

当我们打包生成了

```
index.html
main.js
vendors.js
```

客户端从服务端拿到了两个js文件，会保存在浏览器里。客户端刷新后浏览器会先从缓存里获取。
当开发修改了代码，重新打包，生成了上述三个同名文件时，用户刷新后仍然是原来的代码并没有更新。
**这样如何解决呢？**

### 打包文件添加contentHash

开发环境因为是热更新的，所以本地调试可以不添加，
生产环境在output里改为

```
output: {
    filename: '[name].[contentHash].js',
    chunkFilename: '[name].[contentHash].js'
}
```

**contentHash** 表示只要不改变源代码的内容，那么contentHash所产生的hash值是不会变的。如果代码是分割成不同的chunk，某个chunk没有修改，该chunk的文件名contentHash也不会修改

同时做了代码分割的参数最好也配置一下

```
optimization.splitChunks.cacheGroup.vendors.filename = 'vendors.[contentHash].js'
```

### 对老版本的兼容

可能老的版本即使不改内容，contentHash值也会改变，这个时候可以配置

```
optimization: {
    runtimeChunk:{
      name:'runtime'
    }
}
```

**新版本添加这个runtimeChunk也是没有问题的**，此时打包会多出一个runtime.xxxxxxx.js文件

这是怎么回事呢？

因为在旧的webpack版本里main.js（业务逻辑） 和 vendors.js（第三方库） 之间是存在关联的，这部分的处理代码放在mainfest,虽然没有改变代码，但在旧版本的webpack里 mainfest 包和包之间的关系每次打包可能会变化，当我们配置了runtimeChunk的时候就把mainfest这块关系相关的代码抽离出来了放在runtime.js里

因此这样就解决了这个兼容老版本的问题。







