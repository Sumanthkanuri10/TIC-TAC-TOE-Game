import { useState } from "react";
export default function Player({name,symbol}) {
    const [isEdit,SetIsEdit]=useState(false);
    const [changeName,setChangeName]=useState(name)
    function setClick(){
        SetIsEdit((editing)=>!editing);
    }
    function setChange(event){
        setChangeName(event.target.value);
    }
    let playerName=<span className="player-name">{changeName}</span>
    if (isEdit){
        playerName=<input type="text" required value={changeName} onChange={setChange}/>;
    }
    return  (<li>
    <span className="player">
    {playerName}
    <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={setClick}>{isEdit? 'Save' :"Edit"}</button>
  </li>);
}