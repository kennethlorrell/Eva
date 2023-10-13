const { test } = require('./test-util');

module.exports = (eva) => {
  test(eva, `
    (begin
      (var x 10)
      (var y 20)
      (+ (* x y) 30)
    )
  `, 230);

  test(eva, `
    (begin
      (var x 10)
      (begin
        (var x 20)
      )
      x
    )
  `, 10);

  test(eva, `
    (begin
      (var value 10)
      (var result (begin
        (var x (+ value 10))
      ))
    )
  `, 20);

  test(eva, `
    (begin
      (var data 10)
      (begin
        (set data 100)
      )
    )
  `, 100);

  test(eva, `
    (begin
      (var x 10)
      (var y 20)
      (+ (* x 10) y))
  `, 120);
};