# Shimming

Shimming：在打包过程中，有时候需要对代码兼容。这种兼容不局限于浏览器高低版本。

举个例子

每个文件都是一个模块，每个模块都应该引入自己的依赖才能使用该依赖。

```
import $ from 'jquery'
export function setBackground(){
  $('body').css('background','red')
}
```

但是这样的话，每个文件都要写一遍

```
import $ from 'jquery'
```

因此可以使用垫片的方式来自动配置

```
plugins:[
    new webpack.ProvidePlugin({
      $:'jquery',
      _join:['lodash','join']
    })
]
```

当我们配置了上述内容，那么意味着当运行代码的时候看到

- $这个符号就会自动去node_modules里引入jquery。他的原理就是自动帮我们添加了import的步骤。
- 看到_join就会自动找到 lodash里join的方法

于是我们可以直接这些一个文件模块使用

```
export function setBackground(){
  $('body').css('background', _join(['green'], ''))
}
```

