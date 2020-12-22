// 这里不要写成箭头函数 否则里面的this 就是不是函数里的this

// 同步loader
module.exports = function (source) {
  console.log('source',source);
  console.log('this.query',this.query) // {name:yuyunzhi}
  return source.replace('ykk','yuyunzhi')
}


