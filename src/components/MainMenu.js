import React from 'react'
import { Link } from 'react-router-dom';
import "../App.css";

function MainMenu() {
  function gameStart() {
    let playerName = document.getElementById("playerName").value;

    sessionStorage.setItem("currentPlayerName", playerName);
    sessionStorage.setItem("roundLimit", 6);

    window.location.href = "/game";
  }

  return (
    <div class="start-page">
      <input id="playerName" class="name-input" placeholder="Enter Your Name" />
      <button className="gold-button" onClick={gameStart}>Start Game</button>
      <Link className="gold-button" to="/highscores">High Scores</Link>
    </div>
  )
}

export default MainMenu
