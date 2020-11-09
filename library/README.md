# Library打包

有时候我们并不是打包的业务代码，而是打包一个函数库或者组件库给别人使用。那这个时候需要考虑些什么？

入口文件index.js

```
import * as xxx from './math';
import * as yyy from './string';

export default { xxx, yyy }
```

通过webpack打包后生成library.js

别人会有哪些方式使用？

```
import library from 'library';
const library = require('library')
require(['library'],function(){})
```

还有可能通过script来引入获得全局变量Library

```
<script src='library.js'></script>
```

如何配置？？

```
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    // 可以使用script引入，生成全局变量Library
    library: 'Library',
    // 不管在那种环境require import都可以正确引入成功
    libraryTarget: 'umd'
  }
```

如果library里使用了lodash，别人的业务代码也使用了lodash，那么有可能会打包两份。这时候在我们的webpack中可以使用externals

```
  externals: ['lodash'] , // 打包过程中，发现使用了lodash不打包，让用户在外部自己安装避免打包两次
```

