'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// // 1：输出变量一
// export var firstName = 'Michael';
// export var lastName = 'Jackson';
// export var year = 1958;

// // 2: 输出变量二
// var firstName = 'Michael';
// var lastName = 'Jackson';
// var year = 1958;

// export { firstName, lastName, year };

// // 3: 输出函数或类（class）。
// export function multiply(x, y) {
//   return x * y;
// };

// // 4: as 用来重命名
// function v1() { }
// function v2() { }
// export {
//   v1 as streamV1,
//   v2 as streamV2,
//   v2 as streamLatestVersion
// };
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

exports.firstName = firstName;
exports.lastName = lastName;
exports.year = year;
exports.default = 42;