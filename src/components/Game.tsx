import React, { useState, useEffect } from 'react';
import { generateRandomCompositeNumber, getPrimesUpTo100, getPrimeFactors } from '../utils/primeUtils';
import './Game.css';

interface PrimeButton {
  number: number;
  selectedCount: number;
  colorIndex: number;
}

const colors = ['#ffffff', '#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#c5cae9'];

export const Game: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [primeButtons, setPrimeButtons] = useState<PrimeButton[]>([]);
  const [correctFactors, setCorrectFactors] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startNewGame = () => {
    const newNumber = generateRandomCompositeNumber();
    setTargetNumber(newNumber);
    setCorrectFactors(getPrimeFactors(newNumber));
    setPrimeButtons(getPrimesUpTo100().map(num => ({
      number: num,
      selectedCount: 0,
      colorIndex: 0
    })));
    setMessage('');
    setIsCorrect(null);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handlePrimeClick = (number: number) => {
    setPrimeButtons(prev => prev.map(btn => 
      btn.number === number 
        ? { ...btn, selectedCount: btn.selectedCount + 1, colorIndex: (btn.colorIndex + 1) % colors.length }
        : btn
    ));
  };

  const handleReset = () => {
    setPrimeButtons(prev => prev.map(btn => ({
      ...btn,
      selectedCount: 0,
      colorIndex: 0
    })));
    setMessage('');
    setIsCorrect(null);
  };

  const handleSubmit = () => {
    const selectedFactors = primeButtons
      .filter(btn => btn.selectedCount > 0)
      .flatMap(btn => Array(btn.selectedCount).fill(btn.number));

    const isAnswerCorrect = 
      selectedFactors.length === correctFactors.length &&
      selectedFactors.every((factor, index) => factor === correctFactors[index]);

    setIsCorrect(isAnswerCorrect);
    setMessage(isAnswerCorrect ? '你答對了！' : '答錯囉，請再試一次');

    if (isAnswerCorrect) {
      setTimeout(startNewGame, 2000);
    }
  };

  return (
    <div className="game-container">
      <h1>質因數分解遊戲</h1>
      <div className="target-number">
        請質因數分解 {targetNumber}
      </div>
      
      <div className="prime-buttons">
        {primeButtons.map(btn => (
          <button
            key={btn.number}
            onClick={() => handlePrimeClick(btn.number)}
            style={{ backgroundColor: colors[btn.colorIndex] }}
            className="prime-button"
          >
            {btn.selectedCount > 0 ? `${btn.number}(${btn.selectedCount})` : btn.number}
          </button>
        ))}
      </div>

      <div className="controls">
        <button onClick={handleReset} className="control-button">
          取消
        </button>
        <button onClick={handleSubmit} className="control-button">
          送出答案
        </button>
      </div>

      {message && (
        <div className={`message ${isCorrect ? 'correct' : 'incorrect'}`}>
          {message}
        </div>
      )}
    </div>
  );
}; 