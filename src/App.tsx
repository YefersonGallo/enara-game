import React, {useState} from 'react';

import './App.css';

import Tile from "./Tile";

import boardContent from './test-board-2.json';
import dictionary from './dictionary.json';

function App() {

    const initialBoard = (letters?: string[]): {letter: string, status: boolean}[] => {
        if (letters)
            return letters.map(letter => {
                return {letter, status: false}
            })
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        const newBoard: {letter: string, status: boolean}[] = [];
        for (let i = 0; i < 16; i++) {
            newBoard.push({letter: alphabet[Math.floor(Math.random() * alphabet.length)], status: false});
        }
        return newBoard;

    };

    const getNeighborTiles = (index: number): number[] => {
        const neighbors: number[] = [];
        if (index - 1 >= 0) neighbors.push(index - 1)
        if (index + 1 < 16) neighbors.push(index + 1)
        if (index - 3 >= 0) neighbors.push(index - 3)
        if (index - 4 >= 0) neighbors.push(index - 4)
        if (index - 5 >= 0) neighbors.push(index - 5)
        if (index + 3 < 16) neighbors.push(index + 3)
        if (index + 4 < 16) neighbors.push(index + 4)
        if (index + 5 < 16) neighbors.push(index + 5)
        return neighbors;
    }

    const [board, setBoard] = useState<{ letter: string, status: boolean }[]>(initialBoard());
    const [enableTiles, setEnableTiles] = useState<number[]>([]);
    const [word, setWord] = useState<string>("");
    const [validWord, setValidWord] = useState<boolean>(false);

    const handleClick = (index: number) => {
        if (!board[index].status && (enableTiles?.length === 0 || enableTiles.includes(index))) {
            setEnableTiles(getNeighborTiles(index))
            const aux = [...board];
            aux[index].status = !aux[index].status;
            setBoard(aux);
            setWord(prevState => `${prevState}${aux[index].letter}`)
            dictionary.words.includes(`${word}${aux[index].letter}`.toLowerCase()) ? setValidWord(true) : setValidWord(false);
        }
    }

    return (
        <div className="App">
            <div className="word-container">
                {word && <div className="clear-container">
                    <h4 className="clear">Clear word</h4>
                    <div className="close-btn" onClick={() => {
                        setWord("");
                        setBoard(initialBoard(boardContent.board));
                        setEnableTiles([]);
                    }}/>
                </div>}
                {word &&
                    <div className="word">
                        <h1 style={{color: validWord ? "green" : "red"}}>{word}</h1>
                        <p style={{
                            color: validWord ? "green" : "red",
                            fontSize: "1vw"
                        }}>{validWord ? "Valid" : "Invalid"}</p>
                    </div>
                }
            </div>
            <div className="board">
                {
                    board.map((letter, index) =>
                        <Tile
                            letter={letter.letter}
                            key={index}
                            keyValue={index}
                            status={letter.status}
                            handleClick={handleClick}/>)
                }
            </div>
        </div>
    );
}

export default App;
