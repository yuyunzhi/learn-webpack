// // 懒加载
// async function getComponent() {
//   const {default: _} = await import(/* webpackChunkName:"lodash" */'lodash')
//   const element = document.createElement('div')
//   element.innerHTML = _.join(['y', 'kk'], '-');
//   return element;
// }
//
// document.addEventListener('click', () => {
//   getComponent().then(element => {
//     document.body.appendChild(element)
//   })
// })


import "./style.css"
console.log('hello world')