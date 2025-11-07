import { simpleCalculator, Action, type ValidCalculatorInput } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const a = 1;
    const b = 2;
    const sum = a + b;
    const testData: ValidCalculatorInput = { a, b, action: Action.Add };
    expect(simpleCalculator(testData)).toBe(sum);
  });

  test('should subtract two numbers', () => {
    const a = 5;
    const b = 4;
    const subtract = a - b;
    const testData: ValidCalculatorInput = { a, b, action: Action.Subtract };
    expect(simpleCalculator(testData)).toBe(subtract);
  });

  test('should multiply two numbers', () => {
    const a = 5;
    const b = 4;
    const multiplyResult = a * b;
    const testData: ValidCalculatorInput = { a, b, action: Action.Multiply };
    expect(simpleCalculator(testData)).toBe(multiplyResult);
  });

  test('should divide two numbers', () => {
    const a = 8;
    const b = 4;
    const divideResult = a / b;
    const testData: ValidCalculatorInput = { a, b, action: Action.Divide };
    expect(simpleCalculator(testData)).toBe(divideResult);
  });

  test('should exponentiate two numbers', () => {
    const a = 8;
    const b = 4;
    const expResult = a ** b;
    const testData: ValidCalculatorInput = {
      a,
      b,
      action: Action.Exponentiate,
    };
    expect(simpleCalculator(testData)).toBe(expResult);
  });

  test('should return null for invalid action', () => {
    const a = 8;
    const b = 4;
    const testData = {
      a,
      b,
      action: 'invalidAction',
    };
    expect(simpleCalculator(testData)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const a = 'invalidArg';
    const b = 4;
    const testData = {
      a,
      b,
      action: 'invalidAction',
    };
    expect(simpleCalculator(testData)).toBeNull();
  });
});
