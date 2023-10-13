const { test } = require('./test-util');

module.exports = (eva) => {
  test(eva, `1`, 1);
  test(eva, `"hello"`, 'hello');
};
