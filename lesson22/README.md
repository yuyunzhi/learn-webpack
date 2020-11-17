# TypeScript

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

在根目录下创建tsconfig.json

```
{
  "compilerOptions": {
    "outDir": "./dist",// 导出的的地址在dist
    "module": "es6", //使用es6的模块引入
    "target": "es5", //打包成ES5的代码
    "allowJs": true // 允许在ts文件里引入js文件
  }
}
```

如果使用了第三方库，需要对代码进行提示，那么可以安装@type/xxx

安装对应库的typescript 的 类型

如何查找,在该网站下搜索对应的库，寻找对应的type

https://www.typescriptlang.org/dt/search?search=lodash
