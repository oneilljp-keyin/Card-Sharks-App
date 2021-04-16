import React from 'react'

function Scores() {
  function btn() {
      
  }
  
  return (
    <div className="Score">
      <div className="main-box">
        <div id="GameRules">Game Register</div>
          <div className="GameRules">
          <div id="GameRules">
            <table>
              <tr>
                <th>Name</th>
                <th>Scores</th>
                <th>Country</th>
              </tr>
              <tr>
                <td>John2020</td>
                <td>$12500</td>
                <td>Canada</td>
              </tr>
            <tr>
            <td>Jena@34</td>
            <td>$11000</td>
            <td>Mexico</td>
            </tr>
            <tr>
            <td>Ronny12</td>
            <td>$10500</td>
            <td>Austria</td>
            </tr>
            <tr>
            <td>Markfor</td>
            <td>$10300</td>
            <td>UK</td>
            </tr>
            <tr>
            <td>Laura</td>
            <td>$10200</td>
            <td>Canada</td>
            </tr>
            <tr>
            <td>Megan</td>
            <td>$9800</td>
            <td>Italy</td>
            </tr>
            </table>
        </div>
      </div>
        <input id="username" placeholder="Search Name" />
        <button className="gold-button" onClick={btn} id='button'>Exit</button>
      </div>
    </div>
  )
}
export default Scores;