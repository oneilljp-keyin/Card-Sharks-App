import React from 'react'
import Logo from "./Card_Sharks_2019_logo.png";

function Infoscreen() {
    function btn() {
        
    }
    return (
        <div className="App">
            <div className="main-box">
                <img src={Logo} />
                <div className="GameRules">This is an Information page
                    <h1>In this game, a randomired deck will be used, with the first card dealt off the top being the base card.The player will then guess whether the next card is higher or lower to continue. You have to guess 7 correctly to continue and you will have 3 incorrect guesses.</h1>
                </div>
                <button className="gold-button" onClick={btn} id='button'>Let's play card Shark game</button>
            </div>
        </div>
    )
}

export default Infoscreen
