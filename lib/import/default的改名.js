'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _modules = require('modules');

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// modules.js
function add(x, y) {
  return x * y;
}

// 等同于import foo from 'modules';
exports.default = add;
// 等同于export default add;

// app.js