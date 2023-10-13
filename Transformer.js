/**
 * AST Transformer
 */
class Transformer {
  /**
   * Translates `def`-expression (function declaration)
   * into a variable declaration with anonymous function expression
   */
  transformDefToFn(defExp) {
    const [_tag, name, params, body] = defExp;

    return ['var', name, ['fn', params, body]];
  }

  /**
   * Translates `switch`-expression into a set of if expressions
   */
  transformSwitchToIf(switchExp) {
    const [_tag, ...cases] = switchExp;

    const ifExp = ['if', null, null, null];

    let current = ifExp;

    for (let i = 0; i < cases.length - 1; i++) {
      const [currentCond, currentBlock] = cases[i];

      current[1] = currentCond;
      current[2] = currentBlock;

      const next = cases[i + 1];
      const [nextCond, nextBlock] = next;

      current[3] = nextCond === 'default'
        ? nextBlock
        : ['if'];

      current = current[3];
    }

    return ifExp;
  }

  /**
   * Translates `for`-loop into a while loop with initial condition and modifier
   */
  transformForToWhile(forExp) {
    const [_tag, init, condition, modifier, exp] = forExp;
    const whileBody = ['begin', exp, modifier];
    const whileExp = ['while', condition, whileBody];

    return ['begin', init, whileExp];
  }

  /**
   * Translates `++`operation (increment) into a set operation
   */
  transformDecrementToSet(incExp) {
    const [_tag, variable] = incExp;

    return ['set', variable, ['-', variable, 1]];
  }

  /**
   * Translates `--`operation (decrement) into a set operation
   */
  transformIncrementToSet(decExp) {
    const [_tag, variable] = decExp;

    return ['set', variable, ['+', variable, 1]];
  }
}

module.exports = Transformer;
