import React from 'react'
import { Link } from 'react-router-dom';
import "../App.css";

function MainMenu() {
  function infoPage() {
    let playerName = document.getElementById("playerName").value;
    if (playerName.length === 0) {
      alert("Please Enter Your Name");
      return
    }

    sessionStorage.setItem("currentPlayerName", playerName);
    sessionStorage.setItem("roundLimit", 6);
    sessionStorage.setItem("moneyRound", false);

    window.location.href = "/infoscreen";
  }

  return (
    <div class="start-page">
      <input id="playerName" class="name-input" placeholder="Enter Your Name" />
      <button className="gold-button" onClick={infoPage}>Continue</button>
      <Link className="gold-button" to="/highscores">High Scores</Link>
    </div>
  )
}

export default MainMenu
