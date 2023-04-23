import logo from './logo.svg';
//REACT

import {useCallback, useEffect, useState } from "react";

//CSS
import './App.css';


//IMPORTAR AS PALAVRAS
import { wordsList } from "./data/words";

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';


const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}, //todos os estagios da nossa app, telas .
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  //console.log(words); TESTTE PARA OBSERVAR O OBJETO SENDO LANÇADO NO CONSOLE DO NAVEGADOR



  //startando o game 
  const startGame = () => {
    setGameStage(stages[1].name);
    console.log("o componente foi chamado!"); //test para saber se a minha funçãa foi chamada
  }







  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game />}
      {gameStage === "end" && <GameOver />}
    </div>
  );
}

export default App;
