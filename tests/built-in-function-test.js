const { test } = require('./test-util');

module.exports = (eva) => {
  // Math functions:
  test(eva, `(+ 1 5)`, 6);
  test(eva, `(+ (+ 3 2) 5)`, 10);
  test(eva, `(- 10 5)`, 5);
  test(eva, `(* 2 6)`, 12);
  test(eva, `(/ 14 2)`, 7);

  // Comparison functions:
  test(eva, `(= 5 5)`, true);
  test(eva, `(> 1 5)`, false);
  test(eva, `(>= 5 5)`, true);
  test(eva, `(< 1 5)`, true);
  test(eva, `(<= 5 5)`, true);
};
