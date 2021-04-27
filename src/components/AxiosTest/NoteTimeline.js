import React from "react";

function NoteTimeline (props) {

  const displayHighScores = (props) => {
    const {scores} = props;

    if (scores.length > 0) {
      return(
        scores.map((score) => {
          console.log(score);
          return (
            <tr>
              <td>{score.id}</td>
              <td>{score.date}</td>
              <td>{score.name}</td>
              <td>{score.score}</td>
            </tr>
          )
        })
      )
    } else {
      return (
        <tr>
          <td colSpan="4">No Scores Yet!</td>
        </tr>
      )
    }
  }

  return (
    <>
      {displayHighScores(props)}
    </>
  )

}

export default NoteTimeline