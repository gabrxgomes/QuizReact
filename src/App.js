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

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([]);


  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    //pegar uma categoria aleatoria baseada no tamanho da lista das categorias (total)
    const categories = Object.keys(words)
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);//apos executada a função que randomiza uma categoria

    //pegar uma palavra
    const word = 
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category }

  };


  //startando o game 
  const startGame = () => {
    //vamo criar uma func para escolher a palavra e selecionar a categoria dentro do 
    //tamanho da minha lista de categorias, temos o array [categorias] e o array 
    //categorias = [palavras]
    //mudar a pagina corretamente

    const { word, category } = pickWordAndCategory();



    //criando um array de letras para transformar nossa palavra aleatoria que vem de sua categoria

    let wordLetters = word.split("")




    //o js é key sensitive entao temos que normalizar a primeira letra pois a mesma vem com capslock


    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);

    // setando os status !

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    //pickWordAndCategory(); //printa a categoria escolhida baseada no length

    
    setGameStage(stages[1].name);
    console.log("o componente foi chamado!"); //test para saber se a minha funçãa foi chamada
  }


  //criar função pra verificar o input do usuario
  const verifyLetter = (letter) => {
    console.log(letter);
  }

  //reestartar o jogo

  const retry = () => {
    setGameStage(stages[0].name);
  }


  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (<Game  
      verifyLetter={verifyLetter} 
      pickedWord={pickedWord}
      pickedCategory={ pickedCategory }
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />
      )}
      {gameStage === "end" && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
