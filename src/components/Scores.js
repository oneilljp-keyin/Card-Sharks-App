import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // then use uuidv4() to insert id

function Scores() {
  let highScores = JSON.parse(localStorage.getItem("scores"));
  let topTen = highScores.slice(0,10)

  const displayScores = topTen.map(score => 
    <tr key={uuidv4()}><td>{score.name}</td><td>${score.score.toLocaleString()}</td></tr>)

  // let name = "johnny";
  // let score = 5678;

  // InsertHighScore(name, score);
  
  return (
    <>
      <div className="info-box">
        <h1>High Scores</h1>
            <table className="scores">
              <thead>
                <tr className="scores-header">
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {displayScores}
              </tbody>
            </table>
      </div>
      <div className="round-info"><Link className="gold-button" to="/">Main Menu</Link></div>
    </>
  )
}
export default Scores;