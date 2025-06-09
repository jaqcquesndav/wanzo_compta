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
    accumulator: 0,
    hasParenthesis: false,
    parenthesisCount: 0
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

  const calculatePercentage = () => {
    setState(prev => {
      if (prev.pendingOperator && !prev.waitingForOperand) {
        const currentValue = parseFloat(prev.display);
        let percentValue = 0;
        
        switch (prev.pendingOperator) {
          case '+': 
          case '-': 
            percentValue = (prev.accumulator * currentValue) / 100;
            break;
          case '×':
          case '÷':
            percentValue = currentValue / 100;
            break;
          default:
            percentValue = currentValue / 100;
        }
        
        return {
          ...prev,
          display: percentValue.toString(),
          waitingForOperand: true
        };
      }
      
      return {
        ...prev,
        display: (parseFloat(prev.display) / 100).toString(),
        waitingForOperand: true
      };
    });
  };

  const calculateSquare = () => {
    setState(prev => {
      const value = parseFloat(prev.display);
      const result = value * value;
      return {
        ...prev,
        display: result.toString(),
        waitingForOperand: true
      };
    });
  };

  const calculateSquareRoot = () => {
    setState(prev => {
      const value = parseFloat(prev.display);
      if (value < 0) {
        return {
          ...prev,
          display: 'Error',
          waitingForOperand: true
        };
      }
      const result = Math.sqrt(value);
      return {
        ...prev,
        display: result.toString(),
        waitingForOperand: true
      };
    });
  };

  const calculateInverse = () => {
    setState(prev => {
      const value = parseFloat(prev.display);
      if (value === 0) {
        return {
          ...prev,
          display: 'Error',
          waitingForOperand: true
        };
      }
      const result = 1 / value;
      return {
        ...prev,
        display: result.toString(),
        waitingForOperand: true
      };
    });
  };

  const handleMemory = (operation: 'MC' | 'MR' | 'M+' | 'M-') => {
    setState(prev => {
      const currentValue = parseFloat(prev.display);
      
      switch (operation) {
        case 'MC':
          return {
            ...prev,
            memory: null
          };
        case 'MR':
          if (prev.memory === null) return prev;
          return {
            ...prev,
            display: prev.memory.toString(),
            waitingForOperand: true
          };
        case 'M+':
          return {
            ...prev,
            memory: (prev.memory || 0) + currentValue,
            waitingForOperand: true
          };
        case 'M-':
          return {
            ...prev,
            memory: (prev.memory || 0) - currentValue,
            waitingForOperand: true
          };
        default:
          return prev;
      }
    });
  };

  const handleParenthesis = (type: '(' | ')') => {
    setState(prev => {
      if (type === '(') {
        return {
          ...prev,
          currentExpression: `${prev.currentExpression} (`,
          parenthesisCount: prev.parenthesisCount + 1,
          hasParenthesis: true,
          waitingForOperand: true
        };
      } else if (type === ')' && prev.parenthesisCount > 0) {
        return {
          ...prev,
          currentExpression: `${prev.currentExpression} ${prev.display} )`,
          parenthesisCount: prev.parenthesisCount - 1,
          hasParenthesis: prev.parenthesisCount > 1,
          waitingForOperand: true
        };
      }
      return prev;
    });
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
      case '%': calculatePercentage(); break;
      case 'x²': calculateSquare(); break;
      case '√': calculateSquareRoot(); break;
      case '1/x': calculateInverse(); break;
      case 'MC': handleMemory('MC'); break;
      case 'MR': handleMemory('MR'); break;
      case 'M+': handleMemory('M+'); break;
      case 'M-': handleMemory('M-'); break;
      case '(': handleParenthesis('('); break;
      case ')': handleParenthesis(')'); break;
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