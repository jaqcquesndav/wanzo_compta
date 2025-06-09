import React from 'react';

interface CalculatorKeypadProps {
  onKeyPress: (key: string) => void;
}

export function CalculatorKeypad({ onKeyPress }: CalculatorKeypadProps) {
  const keys = [
    ['MC', 'MR', 'M+', 'M-'],
    ['%', 'CE', 'C', '⌫'],
    ['1/x', 'x²', '√', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['±', '0', '.', '=']
  ];

  const getKeyStyle = (key: string) => {
    const baseStyle = 'p-3 text-sm font-medium rounded-lg transition-colors duration-150 active:scale-95';
    
    if (key === '=') {
      return `${baseStyle} bg-primary hover:bg-primary-hover text-white`;
    }
    if (['MC', 'MR', 'M+', 'M-'].includes(key)) {
      return `${baseStyle} bg-gray-200 dark:bg-dark-hover hover:bg-gray-300 dark:hover:bg-dark-DEFAULT dark:text-gray-300`;
    }
    if (['%', 'CE', 'C', '⌫', '1/x', 'x²', '√', '÷', '×', '-', '+'].includes(key)) {
      return `${baseStyle} bg-gray-100 dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-dark-DEFAULT dark:text-gray-300`;
    }
    return `${baseStyle} hover:bg-gray-100 dark:hover:bg-dark-hover dark:text-gray-300`;
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {keys.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={getKeyStyle(key)}
            >
              {key}
            </button>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}