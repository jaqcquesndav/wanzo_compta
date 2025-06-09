export interface CalculatorOperation {
  id: string;
  expression: string;
  result: number;
  timestamp: string;
}

export interface CalculatorState {
  currentExpression: string;
  display: string;
  memory: number | null;
  history: CalculatorOperation[];
  pendingOperator: string | null;
  waitingForOperand: boolean;
  accumulator: number;
  hasParenthesis: boolean;
  parenthesisCount: number;
}