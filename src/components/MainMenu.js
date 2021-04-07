import React from 'react'
import { Link } from "react-router-dom";
import "../App.css";

function MainMenu() {
  return (
    <div className="header">
      <Link className="gold-button" to="/Game">Game</Link>
      <Link className="gold-button" to="/highscores">High Scores</Link>
    </div>
  )
}

export default MainMenu
