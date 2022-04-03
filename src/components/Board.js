import React, { useState } from 'react'
import Square from './Square';


function Board() {
  const [allSquares, setallSquares] = useState({
      squares : Array(9).fill(null),
      xIsNext : true,
  }) ;

    function renderSquare(i){
        return(
            <Square 
                num={allSquares.squares[i]}
                onClick={() => handleClick(i)} 
            /> 
        ) 
    }

    function handleClick(i) {
        const newSquares = Object.assign({}, allSquares.squares);
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }        
        newSquares[i] = allSquares.xIsNext ? 'X' : 'O';
        setallSquares({
            squares:newSquares,
            xIsNext : !allSquares.xIsNext
        });
 
    }

    const winner = calculateWinner(allSquares.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
        setTimeout(()=>{
            setallSquares({
                squares: Array(9).fill(null),
                xIsNext : true
            });
        },3000)
      
    } else {
      status = 'Next player: ' + (allSquares.xIsNext ? 'X' : 'O');
    }

  return (
    <>
        <div className='status' >{status}</div>
        <div className='board-row'>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
        </div> 
        <div className='board-row'>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
        </div> 
        <div className='board-row'>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
        </div>                    
    </>  

          
  )

  function calculateWinner(squares) {
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
}

export default Board