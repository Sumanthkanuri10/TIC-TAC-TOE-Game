import Player from './components/player.jsx';
import GameBoard from './components/gameBoard.jsx';
import Log from "./components/log.jsx"
import { WINNING_COMBINATIONS } from './components/winningCombinations.jsx';
import { useState } from "react";
import GameOver from './components/gameOver.jsx';
const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function deriveActivePlayer(gameTurns){
  let currentPlayer="X";
if  (gameTurns.length>0 && gameTurns[0].player==="X"){
  currentPlayer="O";
}
return currentPlayer;
}

function App() {
  const[players,setPlayers]=useState({
    X: "player1",
    O:"player2",
  });
  const [gameTurns,SetGameTurns]=useState([]);

  // const [activePlayer,setActivePlayer]=useState("X");
  const activePlayer=deriveActivePlayer(gameTurns);
  let gameBoard=[...initialGameBoard.map(arr=>[...arr])];
    for (const turn of gameTurns){
       const{square,player}=turn;
       const{row, col}=square;
       gameBoard[row][col]=player;
    }
    let winner
    for (const combination of WINNING_COMBINATIONS){
      const firstSquare=gameBoard[combination[0].row][combination[0].column];
      const secSquare=gameBoard[combination[1].row][combination[1].column];
      const ThirdSquare=gameBoard[combination[2].row][combination[2].column];
    
    if (
      firstSquare && firstSquare===secSquare && firstSquare===ThirdSquare){
        winner=players[firstSquare];
      }
    }

    const hasDraw=gameTurns.length===9 && !winner;
function Restart(){
  SetGameTurns([]);
}
function handlePlayerName(symbol,newName){
setPlayers(prevPlayer=>{
  return {
    ...prevPlayer,
    [symbol]:newName
  };
});
}

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
       <Player name="Player 1" symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerName} /> 
       <Player name="Player 2" symbol="O" isActive={activePlayer==='O'}  onChangeName={handlePlayerName}/> 
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} Restart={Restart}/>}
      <GameBoard onSelectSquare={handleSelectedSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
  </main>
  )
}

export default App
