// b.js
var a = require('./a');
console.log(`b文件引用到a的时候打印为${JSON.stringify(a)}`) // 打印为 {a : 200}