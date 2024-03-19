import Player from './components/player.jsx';
import GameBoard from './components/gameBoard.jsx';
import Log from "./components/log.jsx"
import { useState } from "react";

function deriveActivePlayer(gameTurns){
  let currentPlayer="X";
if  (gameTurns.length>0 && gameTurns[0].player==="X"){
  currentPlayer="O";
}
return currentPlayer;
}
function App() {
  const [gameTurns,SetGameTurns]=useState([])
  // const [activePlayer,setActivePlayer]=useState("X");
  const activePlayer=deriveActivePlayer(gameTurns);
  function handleSelectedSquare(rowIndex,colIndex){
    // setActivePlayer((currentActive)=> currentActive==="X" ? "O" : "X")
    SetGameTurns(prevTurns=>{
const currentPlayer=deriveActivePlayer(prevTurns);
const updatedTurns=[{square:{row:rowIndex, col:colIndex},player:currentPlayer}, ...prevTurns,
];
return updatedTurns;
    });
  }

  return (<main>
    <div id="game-container">
      <ol id="players" className='highlight-player'>
       <Player name="Player 1" symbol="X" isActive={activePlayer==='X'} /> 
       <Player name="Player 2" symbol="O" isActive={activePlayer==='O'}/> 
      </ol>
      <GameBoard onSelectSquare={handleSelectedSquare} turns={gameTurns}/>
    </div>
    <Log turns={gameTurns}/>
  </main>
  )
}

export default App
