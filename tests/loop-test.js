const { test } = require('./test-util');

module.exports = (eva) => {
  // test(eva, `
  //   (begin
  //     (var counter 0)
  //
  //     (while (< counter 10)
  //       (set counter (+ counter 1))
  //     )
  //
  //     counter
  //   )
  // `, 10);

  test(eva, `
    (begin
      (var result 0)
      
      (for
        (var i 0)
        (< i 10)
        (++ i)
        (++ result)
      )
  
      result
    )
  `, 10);
};
