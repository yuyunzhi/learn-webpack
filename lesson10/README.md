# Tree Shaking

### 1、什么是Tree Shaking

表示 只引入需要的模块里的代码，没有使用的是不会打包

```
import { add } from './math.js';
add(1, 2);
```

math.js里有两个方法，如果使用了Tree Shaking 那么只会打包add方法

### 2、如何配置

webpack.prod.js 生成环境不需要配置这个

```
optimization: { // 使用tree shaking
     usedExports: true
}
```

package.json

```
"sideEffects": false, // 表示对所有的模块都要使用 tree shaking
"sideEffects":["@babel/polly-fill"，"*.css"] //表示排除@babel/polly-fill ,排除所有的css文件 其余import 模块都使用 tree shaking
```

**注意**如果是开发环境development tree shaking 会不生效，因为调试的话sourceMap行数会不准，生产环境production就会生效