const assert = require('assert');
const { test } = require('./test-util');

module.exports = (eva) => {
  test(eva, `
    (begin
      (def onClick (callback)
        (begin
          (var x 10)
          (var y 20)

          (callback (+ x y))
        )
      )

      (onClick (fn (data) (* data 10)))
    )
  `, 300);

  // Immediately-invoked Function Expression
  test(eva, `
    ((fn (x) (* x x)) 2)
  `, 4);

  // Save anonymous function to the variable
  test(eva, `
    (begin
      (var square (fn (x) (* x x)))

      (square 2)
    )
  `, 4);
};