// 异步loader  打包会慢5秒
module.exports = function (source) {
  const callback = this.async()
  setTimeout(() => {
    const result = source.replace('world', 'ykk')
    callback(null, result)
  }, 5000)
}
