import { useState } from 'react';
import useTicTacToe from '../hooks/use-ttt';

function TicTacToe() {
    const{board,handleClick,calculatewinner,reset_game,get_status_message}= useTicTacToe()
  console.log(board);
  return( <div className='game'>
    <div className='status'>
           {get_status_message()} 
              <button className='reset-button' onClick={reset_game}>Reset Game</button>
    </div>
    <div className='board'>
      {board.map((b,index)=>{
        return <button className='cell' key={index}
        onClick={()=>handleClick(index)}
        disabled={b!==null}
        >
            {b}

        </button>
      })}
    </div>
      </div>
  );
}

export default TicTacToe;
