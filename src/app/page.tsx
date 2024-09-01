"use client";

import { useState } from 'react';

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
};

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className="w-16 h-16 sm:w-15 sm:h-15 md:w-24 md:h-24 bg-gradient-to-b from-black to-purple-950 border-2 border-gray-400 text-xl text-white sm:text-2xl md:text-3xl font-bold flex items-center justify-center rounded-full"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

  function handleClick(i: number): void {
    if (squares[i] || calculateWinner(squares)) {
      return;}
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
    <div className='bg-black h-screen overflow-hidden'>
    <div className="bg-transparent text-purple-950 rounded-md p-2
                 mx-auto w-full max-w-xs text-center font-bold
                 mt-32 md:mt-12 ">
  TIC TAC TOE
</div>
     <div className="bg-transparent text-white rounded-md p-2
                 mx-auto w-full max-w-xs text-center font-semibold text-xl
                 mt-2">
  {status}
</div>
<div className="bg-transparent p-2 sm:p-6 md:p-8 rounded-md mt-4 sm:mt-6 md:mt-6 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mb-2 sm:mb-4 md:mb-6">
    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
  </div>
  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mb-2 sm:mb-4 md:mb-6">
    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
  </div>
  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
  </div>
</div>
</div>
    </>
  );
}

function calculateWinner(squares: (string | null)[]): string | null {
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
}
