# webpack性能优化

## 一、提升打包速度

### 1、跟上技术的迭代（Node,Npm,Yarn）

因为webpack是运行在Node环境，版本尽可能的新

### 2、尽可能少的模块上应用的Loader，降低loader使用的频率

比如合理使用 include exclude   node_modules 因为第三方库已经被编译过了不需要再走一遍

```
{ 
     test: /\.js$/, 
     exclude: /node_modules/, // include:path.resolve(__dirname, '../src')
     loader: 'babel-loader',
}
```


### 3、尽可能精简plugin的使用，同时确保可靠性

### 4、resolve参数合理配置

Extensions,不要配置太多，否则每次引入，都需要对所有的extensions进行循环遍历
