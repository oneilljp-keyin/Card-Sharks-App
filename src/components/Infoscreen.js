import React from 'react';
import { useHistory } from "react-router-dom";

function Infoscreen() {
  const history = useHistory();
  const playerName = sessionStorage.getItem("currentPlayerName");

  function startGame() {
    history.push("/game");
  }

  return (
    <div className="info-box">
      <h2>Hello {playerName},<br/> Welcome To Card Sharks</h2>
        <p>The first card dealt off the top of the deck is your base card.
            At anytime, you may replace your base card, however, you can only
            do it once per round. You then have to guess if the next card is
            higher or lower, and will continue to do so as long as you guess
            correctly. If you guess incorrectly, the card will be discarded and
            replaced with the next card off the deck. You can be incorrect up to 3
            times per round.
        </p>
        <p>Successfully completing the main round will get you to the money round.
            In the money round, you will wager on whether the next card is higher or
            lower. You will start with $10,000 and be required to bet a minimum $1,000
            per round. If you make it to the final card, you can cash out your winnings
            or proceed in playing. If you continue, you must bet at least half your
            bank.
        </p>
      <button className="gold-button" onClick={startGame} id="button">Good Luck! Let's Play Card Sharks</button>
    </div>
  )
}

export default Infoscreen
