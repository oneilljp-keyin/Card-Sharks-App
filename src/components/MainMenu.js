import React from 'react'
import { Link } from "react-router-dom";
import "../App.css";

function MainMenu() {
  return (
    <div className="header">
      <Link className="gold-button" to="/regular">Regular</Link>
      <Link className="gold-button" to="/highscores">High Scores</Link>
    </div>
  )
}

export default MainMenu
