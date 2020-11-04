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

### 1、打包文件添加contentHash

开发环境因为是热更新的，所以本地调试可以不添加，
生产环境在output里改为

```
output: {
    filename: '[name].[contentHash].js',
    chunkFilename: '[name].[contentHash].js'
}
```

**contentHash** 表示只要不改变源代码的内容，那么contentHash所产生的hash值是不会变的。如果代码是分割成不同的chunk，某个chunk没有修改，该chunk的文件名contentHash也不会修改



