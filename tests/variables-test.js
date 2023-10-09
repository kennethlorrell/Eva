const testUtil = require('./test-util');

module.exports = (eva) => {
  testUtil.test(eva, `(var x 10)`, 10);
  testUtil.test(eva, `x`, 10);
  testUtil.test(eva, `(var y 100)`, 100);
  testUtil.test(eva, `y`, 100);
  testUtil.test(eva, `VERSION`, '0.1');
  testUtil.test(eva, `(var isUser true)`, true);
};
