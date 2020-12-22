class CopyrightWebpackPlugin {

  constructor(options) {
    console.log('插件被使用了', options)
  }

  apply(compiler){
    compiler.hooks.compile.tap('CopyrightWebpackPlugin',(compilation)=>{
      console.log('compiler');
    })

    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin',(compilation,cb)=>{
      compilation.assets['copyright.txt']={
        source:function (){
          return 'hahahahahahaa'
        },
        size:function (){
          return 19
        }

      }
      cb()
    })
  }
}

module.exports = CopyrightWebpackPlugin
