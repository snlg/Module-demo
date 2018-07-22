'use strict';

var _2 = require('../export/\u6B63\u5E38\u5BFC\u51FA');

var _ = _interopRequireWildcard(_2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log(_.default); // // 第一组
// export default function crc32() { // 输出
//   // ...
// }
// import crc32 from 'crc32'; // 输入
// // 第二组
// export function crc32() { // 输出
//   // ...
// };
// import { crc32 } from 'crc32'; // 输入

console.log(_.firstName);