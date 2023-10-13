const { test } = require('./test-util');

module.exports = (eva) => {
  test(eva, `
    (begin
      (var counter 0)
      (var result 0)
      
      (while (< counter 10)
        (set result (+ result 1))
        (set counter (+ counter 1))
      )
  
      result
    )
  `, 10);
};
