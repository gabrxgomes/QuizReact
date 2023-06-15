import logo from './logo.svg';
//REACT

import { useCallback, useEffect, useState } from "react";

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

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  //console.log(words); TESTTE PARA OBSERVAR O OBJETO SENDO LANÇADO NO CONSOLE DO NAVEGADOR

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([]);

  
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(50);

  const pickWordAndCategory = useCallback(() => {
    //pegar uma categoria aleatoria baseada no tamanho da lista das categorias (total)
    const categories = Object.keys(words)
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);//apos executada a função que randomiza uma categoria

    //pegar uma palavra
    const word = 
      words[category][Math.floor(Math.random() * words[category].length)];

      console.log(word);

    return { word, category }

  }, [words]);


  //startando o game 
  const startGame = useCallback(() => {
    //vamo criar uma func para escolher a palavra e selecionar a categoria dentro do 
    //tamanho da minha lista de categorias, temos o array [categorias] e o array 
    //categorias = [palavras]
    //mudar a pagina corretamente


    //limpando todas as letras dps de resetar
    clearLetterStates();

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
  }, [pickWordAndCategory]);

  //criar função pra verificar o input do usuario
  const verifyLetter = (letter) => {
    console.log(letter);
    const normalizedLetter = letter.toLowerCase();

    //checaar se a letra foi utilizaadaaa

    if(guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
    ){
      return; //uma trava para o usuario nao usar a mesma letra duas vezes seguidas, tanto pra tirar vantagem tanto como bug
    }

    //sao as tentativas, ou o usuario acerta uma letra ou perde uma chance errando
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
         letter,
      ]);

    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,

      ]);
      //setGuesses((actualGuesses) => actualGuesses - 1);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }

    
    
   
  }; 
  
  console.log(guessedLetters) //nos retorna a autal letra correta
  console.log(wrongLetters)//nos retorna a letra errada
  //reestartar o jogo

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  };

  useEffect(() => {

      if(guesses <= 0) {
        //resetamos todos os states
        clearLetterStates();

        setGameStage(stages[2].name);

      }
     
  }, [guesses]);

  //checando a condição de vitoria
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)];

    //condição de vitoria
    if(guessedLetters.length === uniqueLetters.length) {
      //adicionando o score
      setScore((actualScore) => (actualScore += 100));

      //reestartando o jogo com uma palavra nova

      startGame();
    }

    //console.log(uniqueLetters);

  }, [guessedLetters, letters, startGame]); 



  //reestartando o jogo

  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
    
  };


  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
      <Game  
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
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
