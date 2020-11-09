# webpack常用配置

webpack目前是前端常用的工程化工具了。它可以帮助我们自动化构建打包各类的资源，极大的提高了我们打包代码的效率。在webpack看来，所有的资源文件都是模块(module),只是处理的方式不同。

## 一、初探webpack

### 1、安装webpack

建议不要全局安装webpack,因为不同的项目webpack的版本号是不一样的。这样多个项目来回切换是很不方便的。

```
npm install wepack webpack-cli -g
```

在项目内安装webpack

```
npm install webpack webpack-cli -D
```

**注意**：webpack-cli的作用是我们可以在命令行里直接使用webpack

检查版本

```
npx webpack -v
```

查看 webpack 所有可以安装的版本号

```
npm info webpack
```

### 2、最简单的webpack.config.js的配置

```
const path = require('path');

module.exports = {
	entry: {
	    main:'./src/index.js'
    },
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	}
}
```

这段配置是告诉我们：

- 我们需要打包入口文件是./src/index.js,
- 最后输出的打包文件是在当前目录下dist/main.js
- 假如存在bundle/index.html，就可以通过script引入main.js文件了。当然这个也可以通过webpack自动化构建。

### 3、两种打包方式

#### 1) npx

```
npx webpack
```

**npx 表示会在当前目录里寻找依赖变量 webpack**

### 2) script

在package.json里配置

```
"scripts": {
    "bundle": "webpack"
},
```

于是可以运行

```
npm run bundle
```

运行 npx webpack / npm run bundle 会先检查是否有配置文件webpack.config.js，如果没有就走默认配置，如果有就走配置文件

### 4、打包的参数详解

![打包参数](https://pro-crm.xiaoheiban.cn/202010/471602984977__1603187798648.jpg)

- Hash:表示这一次打包的唯一标识值
- Version:表示这一次打包的使用版本
- Time:表示当前打包整体耗时
- Asset:表示此次打包出现了bundle.js
- Size:表示该文件的大小
- Chunk Names 表示的是 entry里入口的key,默认为main,也可以任意改为 xxx,yyy
- Entrypoint main = bundle.js 表示入口文件 以及依次打包的文件[0][1][2]……

## 二、使用Loader打包资源

### 1、什么是loader？

webpack不能识别非js的模块，需要对于不同的模块提供不同的打包方案，于是要求助于loader。如：css-loader、sass-loader、file-loader、vue-loader、postcss-loader等等

### 2、打包图片

**file-loader**实现原理思路： 当发现代码引入图片模块，首先把图片移动到dist目录下并改了名字，得到了相对于dist的地址，作为返回值给到我们引入的变量之中

```
module.exports = {
	entry: {
		main: './src/index.js'
	},
    module: {
        rules: [{
          test: /\.(jpg|png)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]', // [name] [hash] [ext] 均为占位符
              outputPath: 'images/', // 打包出的结果放在images/目录下
              limit: 10240
            }
          }
        }]
    },
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	}
}
```

### 3、打包CSS 或 SASS

- css-loader:会帮我们分析几个css的关系（互相引入）合并成一个css
- style-loader:当css-loader合并成了一个css,style-loader会把内容挂载到head部分
- sass-loader:解析sass成css
- postcss-loader:自动添加-webkit等前缀，兼容不同浏览器样式

使用了postcss-loader,需要在根目录创建postcss.config.js

```
module.exports = {
  plugins: [
  	require('autoprefixer')
  ]
}
```

webpack.config.js中module配置
```
module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 10240
          }
        }
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }]
  },
```

Loader解析是有先后顺序的：从上到下，从右到左

### 4、CSS modules

```
{
  test: /\.scss$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options:{
        importLoaders: 2,// 表示scss文件导入了scss文件依然走postcss-loader sass-loader
        modules:true // 开启css模块化
      }
    },
    'sass-loader',
    'postcss-loader'
  ]
}
```

modules开启为true后，就可以使用模块化CSS互不干扰。否则引入的CSS或者SASS的代码会造成全局污染

使用方式如下

```
import style from  './index.scss’;

var img = new Image();
img.src = avatar;
img.classList.add(style.avatar);
``` 

### 5、打包字体

在webpack.config.js配置
```
{
    test: /\.(eot|ttf|svg)$/,
    use: {
        loader: 'file-loader'
    } 
},
```

## 三、使用Plugins打包便捷

### 1、什么是Plugins?

plugins是在某个时刻(刚打包、打包结束，打包中间)做一件事

### 2、html-webpack-plugin

在打包结束时，在dist自动生成html，并且把打包的main.js自动引入html的script的标签

### 3、clean-webpack-plugin

在每次打包生成的dist文件前，先删除里面的内容

### 4、安装及配置两个plugin

```
npm install html-webpack-plugin clean-webpack-plugin -D
```

// webpack.prod.js
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin’);

plugins: [new HtmlWebpackPlugin({
  template: 'src/index.html' // 参考模板为 src/index.html
}), new CleanWebpackPlugin(['dist'])],
```

还有其他的plugins，比如热更新 HotModuleReplacementPlugin ……
后面慢慢加上和介绍

## 四、Entry 和 Output 配置

前面的都是单入口，单出口的配置。


### 1、多入口，多出口

```
entry: {
     main: './src/index.js’，
     sub: ‘./src/index.js'
},
plugins: [new HtmlWebpackPlugin({
     template: 'src/index.html'
}), new CleanWebpackPlugin(['dist'])
],
output: {
     filename: '[name].js',
     path: path.resolve(__dirname, 'dist')
}
```

最后的结果是html 里会引入两个js文件
```
<script scr=“./main.js"></script>
<script scr=“./sub.js"></script>
```

### 2、把打包的JS上传到CDN

```
entry: {
    main: './src/index.js’，
    sub: ‘./src/index.js'
},
plugins: [new HtmlWebpackPlugin({
     template: 'src/index.html'
}), new CleanWebpackPlugin(['dist'])
],
output: {
     publicPath: 'http://cdn.com.cn', // 最后打包出来是http://cdn.com.cn、main.js
     filename: '[name].js',
     path: path.resolve(__dirname, 'dist')
}
```

html引入的script 会自动加上publicPath路径
```
<script scr=“http://cdn.com.cn/main.js"></script>
<script scr=“http://cdn.com.cn/sub.js"></script>
```

## 五、SourceMap

### 1、什么是SourceMap

先举个例子：
打开浏览器发现代码报错了。。。。现在知道dist目录下main.js 文件 96行出错。
用了sourceMap之后（它是一个映射关系），于是知道dist目录下main.js文件96行实际上对应的是src目录下index.js文件中的第1行

使用了sourceMap 打包速度是会变慢的。同时dist里多了一个xx.js.map文件，原理一个vlq集合

### 2、配置SourceMap

在webpack.config.js 里 devtool

```
devtool: 'cheap-module-eval-source-map',
```

**常用的几个source-map的前缀**：

- **Inline**:inline-source-map 是把xx.js.map内容直接打包到xx.js里，用data url形式的方式放在末尾,会告诉你第几行第几列除了问题，很耗费性能

- **Cheap**:添加cheap-inline-source-map 可以精确到每一行不精确到每一列出错 ，可以降低打包时间，提高性能

- **Module**:如果要管第三方模块代码的映射可以加上module，可以加上cheap-module-inline-source-map

- **Eval**:eval是打包最快的方式 ，通过eval是执行效率最快、性能最好的方式，但是如果代码复杂的话，提示的内容可能不够全面，用eval的方式执行JS代码

### 3、最佳实践

开发环境：提示全，打包速度快

```
mode: 'development',
devtool: 'cheap-module-eval-source-map',
```

生产环境：提示效果会更好
```
mode: 'production',
devtool: 'cheap-module-source-map',
```

## 六、webpackDevServer

### 1、如何解决每次手动打包，手动启动浏览器刷新页面更新代码？

- **webpack —watch**

在package.json 里 script 添加

```
"watch": "webpack --watch"
```

**优点**：监听到源代码改变，会自动打包
**缺点**：需要手动刷新页面

- **webpack-dev-server**

在package.json 里 script 添加

```
"start": "webpack-dev-server",
```

在devDependencies安装

```
"webpack-dev-server": "^3.1.10"
```

**优点**：监听到源代码改变，会自动打包，自动启动服务器，自动更新浏览器

**注意**使用了webpack-dev-server打包后就不会目录里有dist了，而是放在电脑某个内存里，可以提高效率。

### 2、如何启动时自动打开浏览器

在webpack.config.js配置

```
devServer: {
     contentBase: './dist',
     open: true, // 默认启动开启浏览器
     port: 8080, // 端口设置为8080
},
```

## 七、热更新 HMR(HOT MODULE REPLACE)

如果只是纯粹使用了webpack-dev-server那么当改变了代码，浏览器会自动刷新初始化数据。有时候比较麻烦。

有没有什么办法可以做到：

**当修改了css只改变css的样式,js新增的数据不变。**

![黄色](https://pro-crm.xiaoheiban.cn/202010/2821603164212__1603190567167.jpg)

此时把背景色改成红色

![红色](https://pro-crm.xiaoheiban.cn/202010/2831603164232__1603190608999.jpg)

**或者当修改了某一个模块的数据，另一个模块的数据不改变**

### 配置如下

webpack.prod.js

```
const webpack = require('webpack’);


devServer: {
     contentBase: './dist',
     open: true,
     port: 8080,
     hot: true, // 开启热更新的功能
     hotOnly: true // 即使HMR不生效，也不更新浏览器    
},

plugins: [
     new HtmlWebpackPlugin({
      template: 'src/index.html'
     }), 
     new CleanWebpackPlugin(['dist']),
     new webpack.HotModuleReplacementPlugin() // 配置热更新plugins 
],
```

同时必须添加模块更新的代码。例如有两个模块，当改变了number模块，就更新number，counter模块不改变

index.js

```
import counter from './counter';
import number from './number';


counter();
number();


if(module.hot) {
 module.hot.accept('./number', () => {
  document.body.removeChild(document.getElementById('number'));
  number();
 })
}
```

css可以不写 module.hot判断 是因为css-loader已经实现了。如果一些特别的模块，就需要自己写一个module.hot来判断

## 八、Babel处理ES6语法

### 1、安装依赖 

```
npm install —save-dev babel-loader @babel/core @babel/preset-env
```

- babel-loader : 提供识别模块的打包工具

- @babel/core : 识别js代码转化为AST抽象语法树，编译转化成新的语法

- @babel/preset-env : 把ES6代码转化为ES5语法，提供了翻译规则

### 2、打包方式

二选一

#### 1)安装@babel/profill

```
npm install -save-dev @babel/profill
```

**缺点**：这个会出现全局污染

配置规则

```
rules:[{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options:{
    presets: [['@babel/preset-env', {
      targets: {
        chrome: "67",
      },
      useBuiltIns: 'usage' // 表示做polyfill 根据业务代码来加对应的代码，可以减少打包的体积
    }]]
  }
}],
```

**注意**：useBuiltIns: 'usage' 表示按需引入

### 2)安装 @babel/plugin-transform-runtime

```
npm install -save-dev @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs2
```

**优点**：可是使用闭包的方式不影响其他环境变量

配置 创建.babelrc

```
{
 "plugins": [["@babel/plugin-transform-runtime", {
  "corejs": 2, // 使用了2 就需要安装 @babel/runtime-corejs2
    "helpers": true,
    "regenerator": true,
    "useESModules": false
 }]]
}
```

webpack.prod.js

```
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
}
```

## 九、打包React代码

### 1、安装依赖

@babel/preset-react ： 可以解析JSX

```
npm install --save-dev @babel/preset-react
```

webpack.prod.js

```
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
}
```

创建.babelrc

```
{
  "presets": [
    [
      "@babel/preset-env", {
        "targets": {
          "chrome": "67"
        },
        "useBuiltIns": "usage"
      }
    ],
    "@babel/preset-react"
  ]
}
```

**注意**：先解析react的语法，然后再把ES6语法解析为ES5。presets是自下而上，自右边而左来解析的

# 十、Tree Shaking

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

# 十一、Production Development

### 1、如何切换开发环境和生产环境webpack配置

- 创建生产环境文件 ./build/webpack.prod.js
- 创建开发环境文件 ./build/webpack.dev.js
- 创建公共的代码文件 ./build/webpack.common.js

使用插件 webpack-merge 把配置文件合并

### 2、配置打包命令

package.json

```
"scripts": {
    "dev": "webpack-dev-server --config ./build/webpack.dev.js", // 启动热更新，选择dev配置文件
    "build": "webpack --config ./build/webpack.prod.js" // 直接打包，走prod配置文件
}
```

# 十二、Code Splitting

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

# 十三、SplitChunksPlugin 配置参数详情

### webpackChunkName

修改第三方打包的文件的名字

安装官方的依赖

```
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

.babelrc

```
"plugins": ["@babel/plugin-syntax-dynamic-import"]
```

项目代码里添加名字 /* webpackChunkName:"lodash" */

```
function getComponent(){
  return import(/* webpackChunkName:"lodash" */'lodash').then(({default:_})=>{
    let element = document.createElement('div')
    element.innerHTML = _.join(['Dell','Lee'],'-');
    return element;
  })
}

getComponent().then(ele=>{
  document.body.appendChild(ele)
})
```

**注意**：生成的代码文件为 ./dist/vendors~lodash.js

如果生成的代码文件不想加入 vendors~ ,而是直接lodash.js

那么配置webpack.config.js

```
optimization:{
  splitChunks:{
    chunks:'all',
    cacheGroups:{ // 表示打包的文件是否要带vendors,无论同步或者异步
        vendors:false,
        default:false
    }
  }
}
```

### 详细的splitChunks的参数功能

```
optimization: {
    splitChunks: {
      chunks: 'all', // async 表示只对异步代码分割，initial 表示只对同步代码分割，all的话是所有同时会走到cacheGroups.vendors
      minSize: 30000, // 表示最小模块大于30000个字节才会做代码分割
      // maxSize: 50000, // 如果拆分的代码大小超过50000,会进行二次拆分，一般配置的比较少
      minChunks: 1,//引入几次才分割打包，如果只引入1次就分割，如果是2表示必须大于等于2次才做代码分割
      maxAsyncRequests: 5,// 表示不能超过5个模块分割，超过后面的模块就不分割了
      maxInitialRequests: 3,// 表示整个网站首页或入口文件 如果做代码分割不超过3个
      automaticNameDelimiter: '~', //组和文件名链接符号 vendors~main.js
      name: true,// 表示要更新名字，一般是不需要改变的
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 如果在node_modules里，那么会打包到vendors.js
          priority: -10, // 比如jquery 符合vendors 也符合default，值越大，说明优先级更大
          filename:'vendors.js' // 表示所有的第三方打包到一个叫vendors.js文件
        },
        default: { // 如果是引入自己在项目里写的模块引入走这里，非node_modules
          // minChunks: 2,
          priority: -20,// 值越大，说明优先级更大
          reuseExistingChunk: true, // 如果代码已经打包过，重复引用时就不会再分割打包，而是复用之前的。
          filename: 'common.js'
        }
      }
    }
  },
```

这里要**注意**
- 如果是引入同步代码不会立刻分割，而是会走cacheGroups，根据实际情况来分割

# 十四、LazyLoading 懒加载 Chunk是什么？

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

# 十五、打包分析


生成webpack打包分析json

```
webpack --profile --json > stats.json --config ./build/webpack.dev.js
```

然后把生成的stats.json放入相关的分析网站就可以看到可视化的数据。当然也可以配置analyzer

安装依赖

```
npm install webpack-bundle-analyzer --save-dev
```

在webpack.config.js配置

```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = {
  ...
  configureWebpack: {
    plugins: [
        new BundleAnalyzerPlugin({
                    //  可以是`server`，`static`或`disabled`。
                    //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
                    //  在“静态”模式下，会生成带有报告的单个HTML文件。
                    //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
                    analyzerMode: 'server',
                    //  将在“服务器”模式下使用的主机启动HTTP服务器。
                    analyzerHost: '127.0.0.1',
                    //  将在“服务器”模式下使用的端口启动HTTP服务器。
                    analyzerPort: 8888, 
                    //  路径捆绑，将在`static`模式下生成的报告文件。
                    //  相对于捆绑输出目录。
                    reportFilename: 'report.html',
                    //  模块大小默认显示在报告中。
                    //  应该是`stat`，`parsed`或者`gzip`中的一个。
                    //  有关更多信息，请参见“定义”一节。
                    defaultSizes: 'parsed',
                    //  在默认浏览器中自动打开报告
                    openAnalyzer: true,
                    //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
                    generateStatsFile: false, 
                    //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
                    //  相对于捆绑输出目录。
                    statsFilename: 'stats.json',
                    //  stats.toJson（）方法的选项。
                    //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
                    //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
                    statsOptions: null,
                    logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
        })
    ]
  }, 
  ...
};
```

使用方式 在打包或者启动的时候加 --report

```
npm run serve --report
npm run build --report
```

# 十六、对CSS代码分割

正常打包的话，会把CSS文件一起打包的main.js文件，如何进行CSS代码分割呢？

### 1、使用一个插件：mini-css-extract-plugin

但这个插件有一个缺点，目前不支持热更新，所以适合线上环境做打包

配置方式安装依赖

```
yarn add mini-css-extract-plugin
```

**在生产环境**的webpack.config.js配置

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

  module:{
    rules:[
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css", //index.html直接引入的文件
      chunkFilename: "id.css" // 间接引用的文件
    })
  ]
```

**注意** 如果此时使用了tree shaking 看看 package.json 里 sideEffects 配置。如果为false那么css代码是没有分割的。需要把css tree shaking排除在外。修改如下：

```
 "sideEffects": [
    "*.css"
  ],
```

### 2、接下来对合并的CSS代码压缩

安装依赖

```
yarn add optimize-css-assets-webpack-plugin -D
```

生产环境

```
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

optimization:{
    minimizer:[new OptimizeCSSAssetsPlugin({})]
}

```


# 十七、webpack与浏览器缓存（caching）

当我们打包生成了

```
index.html
main.js
vendors.js
```

客户端从服务端拿到了两个js文件，会保存在浏览器里。客户端刷新后浏览器会先从缓存里获取。
当开发修改了代码，重新打包，生成了上述三个同名文件时，用户刷新后仍然是原来的代码并没有更新。
**这样如何解决呢？**

### 打包文件添加contentHash

开发环境因为是热更新的，所以本地调试可以不添加，
生产环境在output里改为

```
output: {
    filename: '[name].[contentHash].js',
    chunkFilename: '[name].[contentHash].js'
}
```

**contentHash** 表示只要不改变源代码的内容，那么contentHash所产生的hash值是不会变的。如果代码是分割成不同的chunk，某个chunk没有修改，该chunk的文件名contentHash也不会修改

同时做了代码分割的参数最好也配置一下

```
optimization.splitChunks.cacheGroup.vendors.filename = 'vendors.[contentHash].js'
```

### 对老版本的兼容

可能老的版本即使不改内容，contentHash值也会改变，这个时候可以配置

```
optimization: {
    runtimeChunk:{
      name:'runtime'
    }
}
```

**新版本添加这个runtimeChunk也是没有问题的**，此时打包会多出一个runtime.xxxxxxx.js文件

这是怎么回事呢？

因为在旧的webpack版本里main.js（业务逻辑） 和 vendors.js（第三方库） 之间是存在关联的，这部分的处理代码放在mainfest,虽然没有改变代码，但在旧版本的webpack里 mainfest 包和包之间的关系每次打包可能会变化，当我们配置了runtimeChunk的时候就把mainfest这块关系相关的代码抽离出来了放在runtime.js里

因此这样就解决了这个兼容老版本的问题。

# 十八、Shimming

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

# 十九、文件配置引入方式修改

