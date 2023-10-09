const assert = require('assert');

module.exports = (eva) => {
  assert.strictEqual(eva.eval(['+', 1, 5]), 6);
  assert.strictEqual(eva.eval(['+', ['+', 3, 2], 5]), 10);
  assert.strictEqual(eva.eval(['-', 10, 5]), 5);
  assert.strictEqual(eva.eval(['*', 2, 6]), 12);
  assert.strictEqual(eva.eval(['/', 14, 2]), 7);
};
