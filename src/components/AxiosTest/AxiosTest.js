import React, { useState, useEffect } from 'react';
import axios from "./Axios";

function AxiosTest() {
  const [highScores, setHighScores] = useState("");

  useEffect(() => {
    getHighScores();
  }, []);

  const getHighScores = async () => {
    
    const response = await axios.get();

    console.log(response);

    setHighScores(response.data);

  }

  console.log(highScores)


  return (
    <>
      <div className="info-box">
        <h1>High Scores</h1>
      </div>
    </>
  )
}

export default AxiosTest
