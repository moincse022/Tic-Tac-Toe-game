import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 
import './i18n'; 
import Swal from 'sweetalert2'; 

const TicTacToe = () => {
  const { t, i18n } = useTranslation(); 
  const [board, setBoard] = useState(Array(9).fill(null)); 
  const [isXNext, setIsXNext] = useState(true); 
  const [winner, setWinner] = useState(null); 

  // Internationalization in the title (outside JSX, inside React `useEffect`)
  useEffect(() => {
    document.title = t('title'); 
  }, [t]);


  useEffect(() => {
    const winningPlayer = calculateWinner(board);
    if (winningPlayer) {
      setWinner(winningPlayer);
      
    
      Swal.fire({
        title: t('congratulations'),
        text: `${t('winner')}: ${winningPlayer}`, 
        icon: 'success',
        confirmButtonText: t('OK'), 
      });
    }
  }, [board, t]); 


  const handleClick = (index) => {
    if (board[index] || winner) return; 
    const newBoard = board.slice(); 
    newBoard[index] = isXNext ? 'X' : 'O'; 
    setBoard(newBoard); 
    setIsXNext(!isXNext); 
  };

  // Reset the game (clear the board and reset the winner)
  const resetGame = () => {
    setBoard(Array(9).fill(null)); 
    setIsXNext(true); 
    setWinner(null); 
  };

  // Render the board's square
  const renderSquare = (index) => {
    return (
      <button
        className="w-24 h-24 border border-gray-400 text-4xl font-bold text-center flex justify-center items-center"
        onClick={() => handleClick(index)} 
      >
        {board[index]} 
      </button>
    );
  };

  // Simulating a console message for i18n in JavaScript output (outside React)
  useEffect(() => {
    console.log(t('welcome')); 
  }, [t]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  
      <h1 className="text-3xl font-bold mb-8">{t('welcome')}</h1> 
      <div className="grid grid-cols-3 gap-2 mb-6 bg-slate-500">
        {board.map((_, index) => renderSquare(index))} 
      </div>

      {!winner ? (
  <p className="text-xl font-bold mb-4">

    {t('nextPlayer', { player: isXNext ? 'X' : 'O' })} 

  </p>
) : (
  <p className="text-xl font-bold mb-4">

    {t('winner')}: {winner}

  </p>
)}



      <button
        onClick={resetGame} 
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {t('reset')} 
      </button>

    
      <div className="mt-4">
   
        <button
          onClick={() => i18n.changeLanguage('en')}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          English
        </button>
        

        <button
          onClick={() => i18n.changeLanguage('bn')} 
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          বাংলা
        </button>
      </div>
    </div>
  );
};


const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; 
    }
  }
  return null;
};

export default TicTacToe;
