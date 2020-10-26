// import _ from "lodash";  // 假设有1MB
//
// console.log(_.join(['a', 'd', 'c'],"***"))
// // 此处省略10万行业务逻辑
// console.log(_.join(['a', 'b', 'c'],"***"))

function getComponent(){
  return import('lodash').then(({default:_})=>{
    let element = document.createElement('div')
    element.innerHTML = _.join(['Dell','Lee'],'-');
    return element;
  })
}

getComponent().then(ele=>{
  document.body.appendChild(ele)
})