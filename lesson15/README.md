# LazyLoading 懒加载 Chunk是什么？

我们可以使用懒加载的方式引入模块，比如说当触发了某个条件，在通过import的方式引入模块。这样可以使得项目的性能会更加的好。

**举个例子**：

当我们点击页面的时候，才会去引入lodash模块，这里 import()返回的是promise

```
async function getComponent() {
  const {default: _} = await import(/* webpackChunkName:"lodash" */'lodash')
  const element = document.createElement('div')
  element.innerHTML = _.join(['y', 'kk'], '-');
  return element;
}

document.addEventListener('click', () => {
  getComponent().then(element => {
    document.body.appendChild(element)
  })
})
```
同样的路由懒加载的意思，表示当我们监听到路由变化了，才会去引入对应的页面模块。

因此可以知道，Chunk是什么？打包生成几个JS文件，就是几个Chunk




