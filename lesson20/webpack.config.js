const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: ['lodash'] , // 打包过程中，发现使用了lodash不打包，让用户在外部自己安装避免打包两次
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lesson20.js',
    // 可以使用script引入，生成全局变量Library
    // <script src='lesson20.js'></script>
    // lesson20.default使用里面的方法
    library: 'Library',
    // 不管在那种环境require import都可以正确引入成功
    // import lesson20 from 'lesson20';
    // const lesson20 = require('lesson20')
    // require(['lesson20'],function(){})
    libraryTarget: 'umd'
  }
}