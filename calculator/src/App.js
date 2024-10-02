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

  const handleKeyClick = (label) => {
    if (label === 'C') {
      setDisplayValue('0');
    } else if (label === '=') {
      setDisplayValue(calculate(displayValue));
    } else {
      numClick(label);
    }
  };

  const numClick = (label) => {
    if (displayValue === '0' && !isNaN(label)) {
      setDisplayValue(label);
    } else {
      setDisplayValue(displayValue + label);
    }
  };

  const calculate = (expression) => {
    try {
      expression = expression.replace(/÷/g, '/').replace(/×/g, '*');
      const result = evaluate(expression);
      return result.toString();
    } catch {
      return 'Error';
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
          <Key label={7} onClick={handleKeyClick} />
          <Key label={8} onClick={handleKeyClick} />
          <Key label={9} onClick={handleKeyClick} />
          <Key label={'÷'} onClick={handleKeyClick} />
          <Key label={4} onClick={handleKeyClick} />
          <Key label={5} onClick={handleKeyClick} />
          <Key label={6} onClick={handleKeyClick} />
          <Key label={'×'} onClick={handleKeyClick} />
          <Key label={1} onClick={handleKeyClick} />
          <Key label={2} onClick={handleKeyClick} />
          <Key label={3} onClick={handleKeyClick} />
          <Key label={'-'} onClick={handleKeyClick} />

          {/* Clear button with red color */}
          <Key label={'C'} onClick={handleKeyClick} className="clear-button" />

          <Key label={0} onClick={handleKeyClick} />
          <Key label={'='} onClick={handleKeyClick} />
          <Key label={'+'} onClick={handleKeyClick} />
        </div>

        {/* Surname button */}
        <button onClick={handleSurnameClick} className="surname-button">JURADO</button>
      </div>
    </div>
  );
}

export default App;
