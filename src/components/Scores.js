import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "./Axios";
import { v4 as uuidv4 } from 'uuid'; // then use uuidv4() to insert random key

function Scores() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    getHighScores();
  }, []);

  const getHighScores = async () => {

    const response = await axios.get();

    setHighScores(response.data)

  }

  return (
    <>
      <div className="info-box">
        <h1>High Scores</h1>
            <table className="scores">
              <thead>
                <tr className="scores-header">
                  <th>Name</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {highScores.map(score => 
                  <tr key={uuidv4()}><td>{score.name.replace(/&#39;/g, "'").replace(/&#8208;/g, "-")}</td><td>${score.score.toLocaleString()}</td><td>{score.date.slice(0,10)}</td></tr>)
                }
              </tbody>
            </table>
      </div>
      <div className="round-info"><Link className="gold-button" to="/">Main Menu</Link></div>
    </>
  )
}
export default Scores;