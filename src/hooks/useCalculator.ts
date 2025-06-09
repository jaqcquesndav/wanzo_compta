import { useState, useEffect } from 'react';
import type { CalculatorState, CalculatorOperation } from '../types/calculator';
import { calculatorStorage } from '../services/storage/calculatorStorage';

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>({
    currentExpression: '',
    display: '0',
    memory: null,
    history: calculatorStorage.loadHistory(),
    pendingOperator: null,
    waitingForOperand: true,
    accumulator: 0
  });

  useEffect(() => {
    calculatorStorage.saveHistory(state.history);
  }, [state.history]);

  const clearAll = () => {
    setState(prev => ({
      ...prev,
      currentExpression: '',
      display: '0',
      pendingOperator: null,
      waitingForOperand: true,
      accumulator: 0
    }));
  };

  const clearEntry = () => {
    setState(prev => ({
      ...prev,
      display: '0',
      waitingForOperand: true
    }));
  };

  const backspace = () => {
    setState(prev => ({
      ...prev,
      display: prev.display.length > 1 ? prev.display.slice(0, -1) : '0',
      waitingForOperand: false
    }));
  };

  const addDigit = (digit: string) => {
    setState(prev => {
      const newDisplay = prev.waitingForOperand ? digit : prev.display === '0' ? digit : prev.display + digit;
      return {
        ...prev,
        display: newDisplay,
        waitingForOperand: false
      };
    });
  };

  const addDecimalPoint = () => {
    setState(prev => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: '0.',
          waitingForOperand: false
        };
      }
      if (!prev.display.includes('.')) {
        return {
          ...prev,
          display: prev.display + '.',
          waitingForOperand: false
        };
      }
      return prev;
    });
  };

  const changeSign = () => {
    setState(prev => ({
      ...prev,
      display: (-parseFloat(prev.display)).toString(),
      waitingForOperand: false
    }));
  };

  const calculateResult = () => {
    setState(prev => {
      if (!prev.pendingOperator) return prev;

      const currentValue = parseFloat(prev.display);
      let newResult = prev.accumulator;

      switch (prev.pendingOperator) {
        case '+': newResult += currentValue; break;
        case '-': newResult -= currentValue; break;
        case '×': newResult *= currentValue; break;
        case '÷': newResult /= currentValue; break;
      }

      const operation: CalculatorOperation = {
        id: crypto.randomUUID(),
        expression: `${prev.currentExpression} ${prev.display} =`,
        result: newResult,
        timestamp: new Date().toISOString()
      };

      return {
        ...prev,
        display: newResult.toString(),
        currentExpression: '',
        pendingOperator: null,
        waitingForOperand: true,
        accumulator: 0,
        history: [operation, ...prev.history]
      };
    });
  };

  const performOperation = (operator: string) => {
    setState(prev => {
      const currentValue = parseFloat(prev.display);

      if (prev.pendingOperator && !prev.waitingForOperand) {
        let newResult = prev.accumulator;
        switch (prev.pendingOperator) {
          case '+': newResult += currentValue; break;
          case '-': newResult -= currentValue; break;
          case '×': newResult *= currentValue; break;
          case '÷': newResult /= currentValue; break;
        }
        return {
          ...prev,
          display: newResult.toString(),
          currentExpression: `${prev.currentExpression} ${prev.display} ${operator}`,
          pendingOperator: operator,
          waitingForOperand: true,
          accumulator: newResult
        };
      }

      return {
        ...prev,
        currentExpression: `${prev.display} ${operator}`,
        pendingOperator: operator,
        waitingForOperand: true,
        accumulator: currentValue
      };
    });
  };

  const handleKeyPress = (key: string) => {
    switch (key) {
      case 'C': clearAll(); break;
      case 'CE': clearEntry(); break;
      case '⌫': backspace(); break;
      case '.': addDecimalPoint(); break;
      case '±': changeSign(); break;
      case '=': calculateResult(); break;
      case '+':
      case '-':
      case '×':
      case '÷':
        performOperation(key);
        break;
      default:
        if (/[0-9]/.test(key)) {
          addDigit(key);
        }
    }
  };

  const clearHistory = () => {
    setState(prev => ({ ...prev, history: [] }));
    calculatorStorage.clearHistory();
  };

  const selectFromHistory = (operation: CalculatorOperation) => {
    setState(prev => ({
      ...prev,
      display: operation.result.toString(),
      currentExpression: '',
      pendingOperator: null,
      waitingForOperand: true,
      accumulator: 0
    }));
  };

  return {
    display: state.display,
    expression: state.currentExpression,
    memory: state.memory,
    history: state.history,
    handleKeyPress,
    clearHistory,
    selectFromHistory
  };
}