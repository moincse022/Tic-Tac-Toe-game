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
      
      // Show a SweetAlert popup with internationalized content
      Swal.fire({
        title: t('congratulations'), // Dynamically fetch the "congratulations" message
        text: `${t('winner')}: ${winningPlayer}`, // Dynamically fetch the "winner" message
        icon: 'success',
        confirmButtonText: t('OK'), 
      });
    }
  }, [board, t]); 

  // Handle square click, updating the board state and switching turns
  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore click if square is filled or there is a winner
    const newBoard = board.slice(); // Copy board
    newBoard[index] = isXNext ? 'X' : 'O'; // Set the current player's move
    setBoard(newBoard); // Update board state
    setIsXNext(!isXNext); // Switch turn
  };

  // Reset the game (clear the board and reset the winner)
  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Reset board
    setIsXNext(true); // Reset turn to X
    setWinner(null); // Clear winner
  };

  // Render the board's square
  const renderSquare = (index) => {
    return (
      <button
        className="w-24 h-24 border border-gray-400 text-4xl font-bold text-center flex justify-center items-center"
        onClick={() => handleClick(index)} // Click handler for each square
      >
        {board[index]} {/* Display X or O in each square */}
      </button>
    );
  };

  // Simulating a console message for i18n in JavaScript output (outside React)
  useEffect(() => {
    console.log(t('welcome')); // Internationalized message in console log
  }, [t]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Internationalization inside JSX render */}
      <h1 className="text-3xl font-bold mb-8">{t('welcome')}</h1> {/* Internationalized welcome message */}
      <div className="grid grid-cols-3 gap-2 mb-6 bg-slate-500">
        {board.map((_, index) => renderSquare(index))} {/* Render each square on the board */}
      </div>

      {!winner ? (
  <p className="text-xl font-bold mb-4">
    {/* Internationalized message showing next player */}
    {t('nextPlayer', { player: isXNext ? 'X' : 'O' })} 

  </p>
) : (
  <p className="text-xl font-bold mb-4">
    {/* Internationalized message showing winner */}
    {t('winner')}: {winner}

  </p>
)}


      {/* Reset button */}
      <button
        onClick={resetGame} // Reset game when clicked
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {t('reset')} {/* Internationalized reset button */}
      </button>

      {/* Language Switcher */}
      <div className="mt-4">
        {/* Button to switch language to English */}
        <button
          onClick={() => i18n.changeLanguage('en')} // Change language to English
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          English
        </button>
        
        {/* Button to switch language to Bengali */}
        <button
          onClick={() => i18n.changeLanguage('bn')} // Change language to Bengali
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          বাংলা
        </button>
      </div>
    </div>
  );
};

// Helper function to calculate the winner of the game
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
      return squares[a]; // Return the winner (X or O)
    }
  }
  return null; // Return null if there is no winner yet
};

export default TicTacToe;
