import React from 'react';
import './App.css';

interface TileProps {
    letter: string;
    keyValue: number;
    status: boolean;
    handleClick: (index: number) => void;
}

const Tile = ( { letter, keyValue, status, handleClick }: TileProps ) => {

    return(
        <div key={keyValue} className={`${status ? "tile-active": "tile"}`} onClick={() => handleClick(keyValue)}>
            {letter}
        </div>
    )
}

export default Tile;
