import {foo} from '../export/a'
console.log(foo)
setTimeout(()=>{
  console.log(foo)
},1000)
