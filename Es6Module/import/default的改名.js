// modules.js
function add(x, y) {
  return x * y;
}
export { add as default };
// 等同于export default add;

// app.js
import { default as foo } from 'modules';
// 等同于import foo from 'modules';