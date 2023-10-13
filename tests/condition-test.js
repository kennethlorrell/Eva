const { test } = require('./test-util');

module.exports = (eva) => {
  // If test:
  test(eva, `
    (begin
      (var x 10)
      (var y 0)
      (if (> x 10)
        (set y 20)
        (set y 30)
      )
    )
  `, 30);

  // Switch test:
  test(eva, `
    (begin
      (var x 10)

      (switch
        ((= x 10) 100)
        ((> x 10) 200)
        (default  300)
      )
    )
  `, 100);
};
