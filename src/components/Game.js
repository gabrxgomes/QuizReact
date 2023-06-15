import "./Game.css";
import {useState, useRef} from "react";
const Game = ({
    verifyLetter, 
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score,
}) => {
    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();


        verifyLetter(letter);

        setLetter("");//apaga a letra apos clicar pra iniciar o game

        letterInputRef.current.focus(); //ele foca no input da letra limpando o input e lendo mais rapido as entradas
    };


    return (
      <div className="game">
            <p className = "points"> {/* um paragrafo para ser uma box que recebe os pontos */}
                <span>Pontuação: {score}</span>
            </p>
            <h1>Advinhe a palavra:</h1>
            <h3 className="tip"> 
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativas</p>
            <div className="wordContainer">
                {letters.map((letter, i) => 
                    guessedLetters.includes(letter) ? (
                        <span key = {i} className="letter">
                            {letter}
                        </span>
                    ) : (
                        <span key = {i} className="blankSquare"></span>

                    )
                )}
            
            </div>  
            <div className="letterContainer">
                <p>Tente advinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    name="letter" 
                    maxLength="1" 
                    required
                    onChange={(e) => setLetter(e.target.value)}
                    value={letter}
                    ref={letterInputRef} //voce puxa os atributos desse elemento como referencia
                    />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já uitlizadas:</p>
                {wrongLetters.map((letter, i) => (
                    <span key={1}>{letter}, </span>
                ))}
            </div>
      </div>
        
    );
      
};

export default Game;