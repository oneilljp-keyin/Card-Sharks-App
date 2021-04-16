import React from 'react'
import { Link } from 'react-router-dom';
import "./App.css";
import Logo from "./Card_Sharks_2019_logo.png";
import layout from "./sergio-ruiz-WetGvQxnbYY-unsplash (1).jpg"



function GameBank() {
    function btn () {
        return
    }

    return (
        <div className="App">
            <div className="main-box">
            <img src={Logo} />
                <div className="GameRules">
                    <div>You can win if you try again....let's play</div>
                    <button className="gold-button" onClick={btn} id='button'>Higher</button>
                    <button className="gold-button" onClick={btn} id='button'>Lower</button>
                    <button className="gold-button" onClick={btn} id='button'>Sorry!!!</button>
                    <div>You guessed wrong</div>
                    <button className="gold-button" onClick={btn} id='button2'>3 guesses </button>
                    <button className="gold-button" onClick={btn} id='button2'>Try again</button>
                </div>
            
            </div>
        </div>
    );
}

export default GameBank;