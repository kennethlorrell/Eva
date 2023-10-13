const Environment = require('./Environment');
const Transformer = require('./Transformer');

/**
 * Eva interpreter
 */

class Eva {
  /**
   * Creates an Eva instance with the global environment
   */
  constructor(global = GlobalEnvironment) {
    this.global = global;
    this._transformer = new Transformer();
  }

  /**
   * Evaluates an expression
   */
  eval(exp, env = this.global) {
    // Self-evaluating expressions:
    if (this._isNumber(exp)) {
      return exp;
    }

    if (this._isString(exp)) {
      return exp.slice(1, -1);
    }

    // Block: sequence of expressions
    if (exp[0] === 'begin') {
      const blockEnv = new Environment({}, env);

      return this._evalBlock(exp, blockEnv);
    }

    // Variable declaration:
    if (exp[0] === 'var') {
      const [_, name, value] = exp;

      return env.define(name, this.eval(value, env));
    }

    // Variable update:
    if (exp[0] === 'set') {
      const [_, name, value] = exp;

      return env.assign(name, this.eval(value, env));
    }

    // Variable access:
    if (this._isVariableName(exp)) {
      return env.lookup(exp);
    }

    // if expression
    if (exp[0] === 'if') {
      const [_tag, condition, consequent, alternate] = exp;

      if (this.eval(condition, env)) {
        return this.eval(consequent, env);
      }

      return this.eval(alternate, env);
    }

    // while expression
    if (exp[0] === 'while') {
      const [_tag, condition, body] = exp;
      let result;

      while (this.eval(condition, env)) {
        result = this.eval(body, env);
      }

      return result;
    }

    // Function declaration: (def square (x) (* x x))
    //
    // Syntactic sugar for: (var square (fn (x) (* x x)))
    if (exp[0] === 'def') {
      // JIT-transpile to a variable declaration
      const varExp = this._transformer.transformDefToFn(exp);

      return this.eval(varExp, env);
    }

    // Switch expression
    if (exp[0] === 'switch') {
      const ifExp = this._transformer.transformSwitchToIf(exp);

      return this.eval(ifExp, env);
    }

    // For loop
    if (exp[0] === 'for') {
      const resultExp = this._transformer.transformForToWhile(exp);

      return this.eval(resultExp, env);
    }

    // Increment
    if (exp[0] === '++') {
      const setExp = this._transformer.transformIncrementToSet(exp);

      return this.eval(setExp, env);
    }

    // Decrement
    if (exp[0] === '--') {
      const setExp = this._transformer.transformDecrementToSet(exp);

      return this.eval(setExp, env);
    }

    // Anonymous function: (fn (x) (* x x))
    if (exp[0] === 'fn') {
      const [_tag, params, body] = exp;

      return {
        params,
        body,
        env
      };
    }

    // Function calls:
    if (Array.isArray(exp)) {
      const fn = this.eval(exp[0], env);

      const args = exp
        .slice(1)
        .map((arg) => this.eval(arg, env));

      // Native function:
      if (typeof fn === 'function') {
        return fn(...args);
      }

      // User-defined function:
      const activationRecord = {};

      fn.params.forEach((param, index) => {
        activationRecord[param] = args[index];
      });

      const activationEnv = new Environment(
        activationRecord,
        fn.env
      );

      return this._evalBody(fn.body, activationEnv);
    }

    throw `Unimplemented: ${JSON.stringify(exp)}`;
  }

  _evalBody(body, env) {
    if (body[0] === 'begin') {
      return this._evalBlock(body, env);
    }

    return this.eval(body, env);
  }

  _evalBlock(block, env) {
    let result;

    const [_tag, ...expressions] = block;

    expressions.forEach((exp) => {
      result = this.eval(exp, env);
    });

    return result;
  }

  _isNumber(exp) {
    return typeof exp === 'number';
  }

  _isString(exp) {
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
  }

  _isVariableName(exp) {
    return typeof exp === 'string' && /^[+\-*/<>=a-zA-Z_]*$/.test(exp);
  }
}

/**
 * Default Global Environment
 */
const GlobalEnvironment = new Environment({
  null: null,

  true: true,
  false: false,

  VERSION: '0.1',

  // Math

  '+'(op1, op2) {
    return op1 + op2;
  },
  '-'(op1, op2 = null) {
    if (op2 === null) {
      return -op1;
    }

    return op1 - op2;
  },
  '*'(op1, op2) {
    return op1 * op2;
  },
  '/'(op1, op2) {
    return op1 / op2;
  },

  // Comparison

  '='(op1, op2) {
    return op1 === op2;
  },
  '>'(op1, op2) {
    return op1 > op2;
  },
  '>='(op1, op2) {
    return op1 >= op2;
  },
  '<'(op1, op2) {
    return op1 < op2;
  },
  '<='(op1, op2) {
    return op1 <= op2;
  },

  // Console output
  print(...args) {
    console.log(...args);
  }
});

module.exports = Eva;
