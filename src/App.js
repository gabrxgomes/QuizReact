import logo from './logo.svg';
//REACT

import {useCallback, useEffect, useState } from "react";

//CSS
import './App.css';


//IMPORTAR AS PALAVRAS
import { wordsList } from "./data/words";

//components
import StartScreen from './components/StartScreen';


const stages = []

function App() {
  return (
    <div className="App">
      <StartScreen />
    </div>
  );
}

export default App;
