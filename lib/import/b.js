'use strict';

var _a = require('../export/a');

console.log(_a.foo);
setTimeout(function () {
  console.log(_a.foo);
}, 1000);