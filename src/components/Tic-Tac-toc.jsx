import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const TicTacToc = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const winningPlayer = calculateWinner(board);
    if (winningPlayer) {
      setWinner(winningPlayer);
      Swal.fire({
        title: 'Congratulations!',
        text: `Winner is ${winningPlayer}`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

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

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null); // Reset winner
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Tic Tac Toe Game</h1>
      <div className="grid grid-cols-3 gap-2 mb-6 bg-slate-500">
        {board.map((_, index) => renderSquare(index))}
      </div>
      {!winner ? (
        <p className="text-xl font-bold mb-4">Next Player: {isXNext ? 'X' : 'O'}</p>
      ) : (
        <p className="text-xl font-bold mb-4">Winner: {winner}</p>
      )}
      <button
        onClick={resetGame}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Reset Game
      </button>
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

export default TicTacToc;
