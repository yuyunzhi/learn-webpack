# webpack-dev-server

代理转发

```
   proxy:{
      "/react/api":{
        target:'http://www.dell-lee.com',
        pathRewrite:{
          'header.json':'demo.json'
        }
      }
    }
```
