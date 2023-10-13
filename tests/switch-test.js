const assert = require('assert');
const { test } = require('./test-util');

module.exports = (eva) => {
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