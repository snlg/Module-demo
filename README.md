# Module 相关的语法

![enter image description here](http://oy0oxkhrp.bkt.clouddn.com/eca775fcb950c7ba0d5201be9406df79.jpg)

> 前言:  之前也没有去仔细研究过这个，在项目中也只是照葫芦画瓢。今天攻破下这块，不想留下模棱两可的东西。

参考文章：
- [import、require、export、module.exports 混合使用详解](https://juejin.im/post/5a2e5f0851882575d42f5609)
- [exports、module.exports 和 export、export default 到底是咋回事](https://juejin.im/post/597ec55a51882556a234fcef)
- [http://es6.ruanyifeng.com/#docs/module](http://es6.ruanyifeng.com/#docs/module)
- [exports 和 module.exports 的区别](https://cnodejs.org/topic/5231a630101e574521e45ef8)
- [CommonJs规范](http://javascript.ruanyifeng.com/nodejs/module.html#toc2)

## 分类

在`ES6` 之前，社区制定了一些模块加载方案，最主要的有`CommonJS` 和`AMD` 两种。`CommonJS`规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。`AMD`规范则是非同步加载模块，允许指定回调函数。

由于`Node.js`主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以`CommonJS`规范比较适用于服务器，`AMD`用于浏览器。
`ES6` 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代`CommonJS` 和`AMD` 规范，成为浏览器和服务器通用的模块解决方案。
但是，`ES6`模块的设计思想是尽量的静态化，编译时加载。`CommonJS`和`AMD`则是运行时加载。(下面会有具体例子)

了解了基本概念之后，我们将常见的语法分类:
> - `require`: `node` 和`es6`都支持的引入
> - `export / import `: 只有`es6`支持的导出引入
> - `module.exports / exports`: 只有`node`支持的导出

## exports 命令
`Node`里面的模块系统遵循的是`CommonJS`规范。 
> CommonJS定义的模块分为: 模块标识(module)、模块定义(exports) 、模块引用(require)。

在一个`node`执行一个文件时，会给这个文件内生成一个`exports`和`module`对象，
而`module`又有一个`exports`属性。他们之间的关系如下图，都指向一块`{}`内存区域
![内存结构示意图](http://oy0oxkhrp.bkt.clouddn.com/exports)


上[demo](https://github.com/snlg/Module-demo/blob/master/exports/a.js)
```javascript
// a.js
let a = 100;
console.log(`新建时候的module.exports${JSON.stringify(module.exports)}`); 
console.log(`新建时候的exports${JSON.stringify(exports)}`); 
exports.a = 200; //这里module.exports 的内容给改成 {a : 200}
exports = '指向其他内存区'; //这里把exports的指向指走
console.log(`完成修改时候的module.exports${JSON.stringify(module.exports)}`); 
console.log(`完成修改时候的exports${JSON.stringify(exports)}`); 

// b.js
var a = require('./a');
console.log(`b文件引用到a的时候打印为${JSON.stringify(a)}`)
```
运行结果为:
![](http://oy0oxkhrp.bkt.clouddn.com/WX20180722-161645@2x.png)
> exports只辅助module.exports操作内存中的数据，结果到最后真正被require出去的内容还是module.exports的.
> 为了避免糊涂，尽量都用 module.exports 导出，然后用require导入。

## export 命令
先贴出阮老师文档上的几种方式
```javascript
// 1：输出变量一
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// 2: 输出变量二
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };

// 3: 输出函数或类（class）。
export function multiply(x, y) {
  return x * y;
};

// 4: as 用来重命名
function v1() { }
function v2() { }
export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};

```
> 2对比1来说，有点在于写在脚本尾部，一眼看清楚输出了哪些变量。

需要特别注意的是，`export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

```javascript
export 1 // 报错

// 报错
var m = 1
export m
// 1只是一个值，不是接口。
export var m = 1 // 正确方法1

var m = 1
export {m} // 正确方法2

// function和class也是一样,
function f() {}
export f; //报错

export function f() {};// 正确

function f() {}
export {f}; // 正确
```
`export`语句输出值是可以动态的
```javascript
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```
```javascript
// b.js
import {foo} from '../export/a'
console.log(foo)
setTimeout(()=>{
  console.log(foo)
},1000)
```
在引用`500ms`后值会改变, 测试结果如下。[demo](https://github.com/snlg/Module-demo/blob/master/Es6Module/import/b.js)
![](http://oy0oxkhrp.bkt.clouddn.com/WX20180722-170927@2x.png)

最后由于`Es6Module`设计思想是尽量的静态化,编译时加载。并非执行时加载，所以，`export`不能用在块级作用域内(函数和条件语句)，会报错。
```javascript
function foo() {
  export default 'bar' // SyntaxError
}
foo()

if (a) {
  export ... // error
}
```
## import 命令
常规用法
```javascript
// 第一组
export default function crc32() { // 输出
  // ...
}
import crc32 from 'crc32'; // 输入
// 第二组
export function crc32() { // 输出
  // ...
};
import { crc32 } from 'crc32'; // 输入
```
`export default`时，对应的`import`语句不需要使用大括号；第二组是不使用`export default`时，对应的`import`语句需要使用大括号。

本质上，`export default`就是输出一个接口叫做`default`的变量或方法，然后系统允许你为它取任意名字。所以，在导入导出的时候 允许改名。
```javascript
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于export default add;

// app.js
import { default as foo } from 'modules';
// 等同于import foo from 'modules';
```
正是因为`export default`命令其实只是输出一个叫做`default`的变量，所以它和`export`不一样后面不能跟变量声明语句。
```javascript
// 正确
export var a = 1;
// 正确
var a = 1;
export default a;
// 错误
export default var a = 1;
```
反之,因为`export default`命令的本质是将后面的值，赋给`default`变量，所以可以直接将一个值写在`export default`之后。
```javascript
// 正确
export default 42;
// 报错
export 42;
```
## 模块的整体加载
常规用法如下
```javascript
// a.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export { firstName, lastName, year };
export default 42;

//b.js
import * as _ from 'a'
console.log(_.default) //42;
console.log(_.firstName) //Michael;
```
> 注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。
```javascript
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```
## 模块的继承
铺垫
```javascript
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```
上述运行时状态是不可以改变的，但是继承的模块运行时是可以改变,具体如下：
```javascript
// circleplus.js
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}// 不需要关心circle有什么方法。
// main.js
import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));
```
上述方法 其实做到了在运行时(间接静态)改变某个引用的方法。

## 拓展
>  `webpack`中`bable`对模块的兼容性处理`(CommonJs/Es6Modules)`的原理。

End....


