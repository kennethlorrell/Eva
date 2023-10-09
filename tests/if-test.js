const testUtil = require('./test-util');

module.exports = (eva) => {
  testUtil.test(eva, `
    (begin
      (var x 10)
      (var y 0)
      (if (> x 10)
        (set y 20)
        (set y 30)
      )
    )
  `, 30);
};
