import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";


import SmallGold from "../assets/cs-square-gold-mini.png";
import SmallBlue from "../assets/cs-square-blue-mini.png";
import SmallRed  from "../assets/cs-square-red-mini.png";

const PopUpResults = ({ isShowing, hide, title, message, path, button, showLink, showCancel, showOK}) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay" />
    <div className="alert-modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="alert-modal">
        <div className="modal-logos">
          <img src={SmallBlue} alt="Card Sharks" />
          <img src={SmallGold} alt="Card Sharks" />
          <img src={SmallRed}  alt="Card Sharks" />
        </div>
        <div className="modal-header">
        <h1>{title}</h1>
        </div>
        <p>
        {message}
        </p>
        <div className="modal-buttons">
          {showOK ? <button className="blue-button" onClick={hide}>OK</button> : null }
          {showCancel ? <button className="gold-button" onClick={hide}>Cancel</button> : null }
          {showLink ? <Link className="red-button" to={path}>{button}</Link> : null }
          <br />
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default PopUpResults;