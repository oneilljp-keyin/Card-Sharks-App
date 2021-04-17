import React from 'react'

function Scores() {
  let highScores = localStorage.getItem("highScores");
  
  return (
      <div className="info-box">
        <h1>High Scores</h1>
            <table className="scores">
              <thead>
                <tr className="scores-header">
                  <th>Name</th>
                  <th>Scores</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John2020</td>
                  <td>$12,500</td>
                  <td>Canada</td>
                </tr>
                <tr>
                  <td>Jena@34</td>
                  <td>$11,000</td>
                  <td>Mexico</td>
                </tr>
                <tr>
                  <td>Ronny12</td>
                  <td>$10,500</td>
                  <td>Austria</td>
                </tr>
                <tr>
                  <td>Markfor</td>
                  <td>$10,300</td>
                  <td>UK</td>
                </tr>
                <tr>
                  <td>Laura</td>
                  <td>$10,200</td>
                  <td>Canada</td>
                </tr>
                <tr>
                  <td>Megan</td>
                  <td>$9,800</td>
                  <td>Italy</td>
                </tr>
              </tbody>
            </table>
        <button className="gold-button" onClick={() => window.location.href = "/"} id="button">Main Menu</button>
      </div>
  )
}
export default Scores;