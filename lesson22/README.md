# TypeScript

安装对应库的typescript 的 类型

@type/xxx

如何查找,在该网站下搜索对应的库，寻找对应的type

https://www.typescriptlang.org/dt/search?search=lodash

webpack.config.js配置方式

```
const path = require('path');

module.exports={
  mode:'production',
  entry:'./src/index.tsx',
  module:{
    rules:[{
      test:/\.tsx?$/,
      use:'ts-loader',
      exclude:/node_moudles/
    }]
  },
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  }
}
```