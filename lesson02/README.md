# 使用loader打包静态图片

### 什么是loader？
    
Webpack不能识别非js的模块，对于不同的模块提供不同的打包方案，于是要求助于loader。css-loader file-loader vue-loader

### file-loader实现的逻辑？

当发现代码引入图片模块，首先把图片移动到dist目录下并改了名字，得到了相对于dist的地址，作为返回值给到我们引入的变量之中

注意使用了什么loader记得安装一下 npm install xxx-loader -D

### css-loader style-loader 实现原理？
 
css-loader 会帮我们分析几个css的关系（互相引入）合并成一个css
style-loader  当css-loader合并成了一个css,style-loader会把内容挂载到head部分
sass-loader  解析sass成css
    
### postcss-loader

自动添加-webkit前缀

### loader解析是有先后顺序的

从上到下，从右到左

```
use: [
  'style-loader',
  'css-loader',
  'sass-loader',
  'postcss-loader'
]
```

### css modules

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

开启true后，就可以使用，模块化CSS 不会全局干扰

```
import style from  './index.scss’;

var img = new Image();
img.src = avatar;
img.classList.add(style.avatar);
```