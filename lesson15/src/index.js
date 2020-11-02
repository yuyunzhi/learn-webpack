import _ from "lodash";  // 假设有1MB

// let element = document.createElement('div')
// element.innerHTML = _.join(['Dell', 'Lee'], '-');
// document.body.appendChild(element)

// 懒加载
// async function getComponent() {
//   const {default: _} = await import(/* webpackChunkName:"lodash" */'lodash')
//
//   return element;
// }

document.addEventListener('click', () => {
  import(/* webpackPrefetch:true */'./click.js').then(({default:func}) => {
    func()
  })
})

// document.addEventListener('click', () => {
//   const element = document.createElement('div')
//   element.innerHTML = 'ykk'
//   document.body.appendChild(element)
// })
