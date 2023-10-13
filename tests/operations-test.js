const { test } = require('./test-util');

module.exports = (eva) => {
  // Increment test
  test(eva, `
    (begin
      (var i 4)
      (++ i)
    )
  `, 5);

  // Increment test
  test(eva, `
    (begin
      (var i 70)
      (-- i)
    )
  `, 69);
};
