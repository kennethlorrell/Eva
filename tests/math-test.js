const { test } = require('./test-util');

module.exports = (eva) => {
  test(eva, `(+ 1 5)`, 6);
  test(eva, `(+ (+ 3 2) 5)`, 10);
  test(eva, `(- 10 5)`, 5);
  test(eva, `(* 2 6)`, 12);
  test(eva, `(/ 14 2)`, 7);
};
