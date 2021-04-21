import React from 'react';
import ReactDOM from 'react-dom';

import SmallGold from "../assets/cs-square-gold-mini.png";
import SmallBlue from "../assets/cs-square-blue-mini.png";
import SmallRed  from "../assets/cs-square-red-mini.png";

const Results = ({ isShowing, hide, name, money, baseCard, setRound, swapOut}) => isShowing ? ReactDOM.createPortal(
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
        <h1>Congratulations {name}!</h1>
        </div>
        <p>
        This is the final round. You can quit now with ${money.toLocaleString()}.
        Or you can continue, however, you will have to bet at least HALF your money.<br /><br />
        Your current base card is:<br />{baseCard}<br />
        {!swapOut ? <span>And you still have your swap out card</span> : null}
        </p>
        <div className="modal-buttons">
          <button className="gold-button" onClick={hide}>Continue</button>
          <button className="gold-button" onClick={setRound}>Submit Score</button>
          <br />
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Results;