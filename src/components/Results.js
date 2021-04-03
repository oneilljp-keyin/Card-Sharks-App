import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

const Results = ({ isShowing, hide, result}) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <h1>Congratulations!</h1>
        </div>
        <p>
        { result ? "You made it to the Money Round" : "Better luck next time" }
        </p>
        <div className="modal-buttons">
          <Link className="gold-button" to="/">Main Menu</Link>
          <Link className="gold-button" to="/money">Money Round</Link>
          <Link className="gold-button" to="/regular">Try Again</Link>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Results;