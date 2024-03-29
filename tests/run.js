const Environment = require("../Environment");
const Eva = require("../Eva");

const tests = [
  require('./self-eval-test'),
  require('./math-test'),
  require('./variables-test'),
  require('./block-test'),
  require('./condition-test'),
  require('./loop-test'),
  require('./built-in-function-test'),
  require('./user-defined-function-test'),
  require('./anonymous-function-test'),
  require('./operations-test'),
  require('./class-test'),
]

const eva = new Eva();

tests.forEach((test) => test(eva));

console.log('All assertions passed!');
