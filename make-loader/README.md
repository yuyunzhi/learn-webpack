# loader实现

loader其实就是一个函数 ，里面的参数就是拿到校验过的文件源码，进行处理然后返回源码

```
// 同步loader
module.exports = function (source) {
  console.log('source',source); // 源码
  return source.replace('ykk','yuyunzhi')
}

```
