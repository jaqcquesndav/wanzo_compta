import React, { useState, useEffect } from 'react';
import { X, Calculator as CalcIcon, Minimize2, History } from 'lucide-react';
import { CalculatorDisplay } from './CalculatorDisplay';
import { CalculatorKeypad } from './CalculatorKeypad';
import { CalculatorHistory } from './CalculatorHistory';
import { useCalculator } from '../../hooks/useCalculator';
import { useCalculatorStore } from '../../hooks/useCalculatorStore';

export function Calculator() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 340, y: 80 });
  const { 
    display, 
    expression, 
    memory, 
    history,
    handleKeyPress, 
    clearHistory,
    selectFromHistory 
  } = useCalculator();
  const closeCalculator = useCalculatorStore(state => state.close);

  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 340),
        y: Math.min(prev.y, window.innerHeight - 500)
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragStart = (e: React.MouseEvent) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleDrag = (e: MouseEvent) => {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 340, e.clientX - startX)),
        y: Math.max(0, Math.min(window.innerHeight - 500, e.clientY - startY))
      });
    };

    const handleDragEnd = () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  };  return (
    <div
      className={`fixed z-50 bg-white dark:bg-dark-secondary rounded-lg shadow-xl transition-all duration-200 
        ${isMinimized ? 'w-12 h-12' : showHistory ? 'w-[560px]' : 'w-[340px]'}`}
      style={{ left: position.x, top: position.y }}
    >
      <div 
        className="p-3 border-b dark:border-dark-DEFAULT flex items-center justify-between cursor-move select-none"
        onMouseDown={handleDragStart}
      >
        <div className="flex items-center space-x-2">
          <CalcIcon className="h-5 w-5 text-primary" />
          {!isMinimized && <span className="text-sm font-medium dark:text-white">Calculatrice Comptable</span>}
        </div>
        <div className="flex items-center space-x-1">
          {!isMinimized && (
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-1.5 rounded-full ${showHistory ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-dark-hover text-gray-500 dark:text-gray-400'}`}
              title="Historique"
            >
              <History className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full"
            title={isMinimized ? "Restaurer" : "Réduire"}
          >
            <Minimize2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={closeCalculator}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full"
            title="Fermer"
          >
            <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex">
          {showHistory && (
            <div className="w-[220px] border-r dark:border-dark-DEFAULT">
              <CalculatorHistory
                operations={history}
                onClear={clearHistory}
                onSelect={selectFromHistory}
              />
            </div>
          )}
          
          <div className="p-4 space-y-4 flex-1">
            <CalculatorDisplay 
              value={display} 
              expression={expression}
              memory={memory} 
            />
            <CalculatorKeypad onKeyPress={handleKeyPress} />
          </div>
        </div>
      )}
    </div>
  );
}