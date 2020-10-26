# Code Splitting

### 第一种方式

```
import _ from "lodash";  // 假设lodash有1MB

// 假设业务代码有1MB
console.log(_.join(['a', 'd', 'c'],"***"))
console.log(_.join(['a', 'b', 'c'],"***"))
```

- 首次访问页面，加载main.js 2MB
- 导致打包文件会很大，加载时间会很长
- 当我修改了代码，重新打包 main.js 2MB。用户重新访问我们的页面，又要加载2MB内容

**优点**：不用配置什么代码，正常使用引入即可
**缺点**：用户需要重新加载页面，性能不好

### 第二种方式

```
import _ from "lodash"  // 假设lodash有1MB
window._ = _
```

```
// 假设业务代码有1MB
console.log(_.join(['a', 'd', 'c'],"***"))
console.log(_.join(['a', 'b', 'c'],"***"))
```

webpack.config.js

```
entry: {
  lodash: './src/lodash.js',
  main: './src/index.js'
}
```

- 首次访问页面，加载 main.js: 被拆成lodash.js 1MB 和 业务代码main.js 1MB
- 此时修改了业务代码，用户是不需要重新加载lodash代码的。只需要重新加载main.js

优点：可以有效提提高代码运行的速度、用户体验提高、性能提高
缺点：需要手动拆分页面的代码，不够智能

### 第三种方式:同步方式

webpack.config.js
```
optimization:{
	  splitChunks:{
	    chunks:'all'
    }
}
```

```
import _ from "lodash";  // 假设有1MB

console.log(_.join(['a', 'd', 'c'],"***"))
// 此处省略10万行业务逻辑
console.log(_.join(['a', 'b', 'c'],"***"))

```

优点：相比第二种方式，可以自动拆分，打包引入 main.js 和 vendors~main.js
**注意** 这是同步引入


### 第四种方式：异步方式

安装插件

```
yarn add -D babel-plugin-dynamic-import-webpack
```

.babelrc

```
"plugins": ["babel-plugin-dynamic-import-webpack"]
```

异步代码如下

```
function getComponent(){
  return import('lodash').then(({default:_})=>{
    let element = document.createElement('div')
    element.innerHTML = _.join(['Dell','Lee'],'-');
    return element;
  })
}

getComponent().then(ele=>{
  document.body.appendChild(ele)
})
```

**注意**：异步代码import引入的模块，无需配置额外的webpack.config.js，会自动引入


