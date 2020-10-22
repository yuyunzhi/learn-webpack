# 打包React代码


### 安装依赖

@babel/preset-react ： 可以解析JSX
```
npm install --save-dev @babel/preset-react
```

.babelrc

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
注意：先解析react的语法，然后再把ES6语法解析为ES5。presets是自下而上，自右边而左来解析的