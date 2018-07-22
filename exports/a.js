// a.js
let a = 100;

console.log(`新建时候的module.exports${JSON.stringify(module.exports)}`); //能打印出结果为：{}
console.log(`新建时候的exports${JSON.stringify(exports)}`); //能打印出结果为：{}

exports.a = 200; //这里辛苦劳作帮 module.exports 的内容给改成 {a : 200}
exports = '指向其他内存区'; //这里把exports的指向指走

console.log(`完成修改时候的module.exports${JSON.stringify(module.exports)}`); 
console.log(`完成修改时候的exports${JSON.stringify(exports)}`); 