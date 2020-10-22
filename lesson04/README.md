# 使用多入口、多出口打包


### 多入口，多出口

```
entry: {
     main: './src/index.js’，
    sub: ‘./src/index.js'
},
plugins: [new HtmlWebpackPlugin({
     template: 'src/index.html'
}), new CleanWebpackPlugin(['dist'])],
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

### 把打包的js上传到CDN

```
entry: {
     main: './src/index.js’，
    sub: ‘./src/index.js'
},
plugins: [new HtmlWebpackPlugin({
     template: 'src/index.html'
}), new CleanWebpackPlugin(['dist'])],
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