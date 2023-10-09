const testUtil = require('./test-util');

module.exports = (eva) => {
  testUtil.test(eva, `(+ 1 5)`, 6);
  testUtil.test(eva, `(+ (+ 3 2) 5)`, 10);
  testUtil.test(eva, `(- 10 5)`, 5);
  testUtil.test(eva, `(* 2 6)`, 12);
  testUtil.test(eva, `(/ 14 2)`, 7);
};
