const { test } = require('./test-util');

module.exports = (eva) => {
  test(eva, `
    (begin
      (var counter 0)
      
      (while (< counter 10)
        (set counter (+ counter 1))
      )
  
      counter
    )
  `, 10);
};
