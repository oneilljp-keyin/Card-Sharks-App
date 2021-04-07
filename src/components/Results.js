import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

import SmallGold from "../assets/cs-square-gold-mini.png";
import SmallBlue from "../assets/cs-square-blue-mini.png";
import SmallRed  from "../assets/cs-square-red-mini.png";

const Results = ({ isShowing, hide, result, header, tag}) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-logos">
          <img src={SmallBlue} alt="Card Sharks" />
          <img src={SmallGold} alt="Card Sharks" />
          <img src={SmallRed}  alt="Card Sharks" />
        </div>
        <div className="modal-header">
        <h1>{header}!</h1>
        </div>
        <p>
        {tag}
        </p>
        <div className="modal-buttons">
          <Link className="gold-button" to="/">Main Menu</Link>
          { result ? <Link className="gold-button" to="/money">Money Round</Link> : <button className="gold-button" onClick={() => window.location.reload(true)}>Try Again</button> }
          <br />
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Results;