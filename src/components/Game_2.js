import React from 'react';
import { Button } from '@material-ui/core';
import Logo from "./Card_Sharks_2019_logo.png";


function Game() {
    function btn(){

    }
    return (
        <div>
            This is the card game page. 
            <img src={Logo} />
            <button className="gold-button" onClick={btn} id='button2'>Play</button>
        </div>  
    
        
    )
}

export default Game;
