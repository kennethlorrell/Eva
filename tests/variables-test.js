const { test } = require('./test-util');

module.exports = (eva) => {
  test(eva, '(var x 10)', 10);
  test(eva, 'x', 10);
  test(eva, '(var y 100)', 100);
  test(eva, 'y', 100);
  test(eva, 'VERSION', '0.1');
  test(eva, '(var isUser true)', true);
};
