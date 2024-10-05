import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import './App.css';

function Key({ label, onClick, className }) {
  const handleClick = (event) => {
    event.preventDefault();
    onClick(label);
  };

  return (
    <button onClick={handleClick} className={`key-button ${className}`}>
      {label}
    </button>
  );
}

function Display({ value }) {
  return (
    <div className="display">
      {value}
    </div>
  );
}

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleKeyClick = (label) => {
    if (label === 'C') {
      setDisplayValue('0');
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(false);
    } else if (label === '=') {
      handleEquals();
    } else if (['+', '-', '×', '÷'].includes(label)) {
      handleOperator(label);
    } else {
      handleNumberClick(label);
    }
  };

  const handleNumberClick = (label) => {
    if (waitingForOperand) {
      setDisplayValue(label);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? label : displayValue + label);
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (prevValue == null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const result = calculate(prevValue, inputValue, operator);
      setDisplayValue(result.toString());
      setPrevValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);

    if (operator && prevValue !== null) {
      const result = calculate(prevValue, inputValue, operator);
      setDisplayValue(result.toString());
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const calculate = (prev, current, operator) => {
    switch (operator) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      default:
        return current;
    }
  };

  const handleSurnameClick = () => {
    setDisplayValue('James Daniel D. Jurado');
  };

  return (
    <div className="app">
      <h1>Calculator of James Daniel D. Jurado - IT3A</h1>
      <div className="calc-container">
        <Display value={displayValue} />
        <div className="keys">
          <Key label={'7'} onClick={handleKeyClick} />
          <Key label={'8'} onClick={handleKeyClick} />
          <Key label={'9'} onClick={handleKeyClick} />
          <Key label={'÷'} onClick={handleKeyClick} />
          <Key label={'4'} onClick={handleKeyClick} />
          <Key label={'5'} onClick={handleKeyClick} />
          <Key label={'6'} onClick={handleKeyClick} />
          <Key label={'×'} onClick={handleKeyClick} />
          <Key label={'1'} onClick={handleKeyClick} />
          <Key label={'2'} onClick={handleKeyClick} />
          <Key label={'3'} onClick={handleKeyClick} />
          <Key label={'-'} onClick={handleKeyClick} />

          <Key label={'C'} onClick={handleKeyClick} className="clear-button" />

          <Key label={'0'} onClick={handleKeyClick} />
          <Key label={'='} onClick={handleKeyClick} />
          <Key label={'+'} onClick={handleKeyClick} />
        </div>

        <button onClick={handleSurnameClick} className="surname-button">JURADO</button>
      </div>
    </div>
  );
}

export default App;
