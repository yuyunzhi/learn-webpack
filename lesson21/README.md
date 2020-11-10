# PWA

什么是PWA，传统服务器关闭后，页面访问就失败了。使用了PWA，即使断了服务器仍然浏览器可以获取缓存信息。防止服务器崩溃时候页面直接崩溃。

线上的代码才要做PWA，本地代码运行时不需要的。

webpack配置方式

```
const WorkboxPlugin = require('workbox-webpack-plugin')

plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
],
```