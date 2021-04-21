import { useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';

import AlertModal from "./PopUpAlert";
import useAlertModal from "./useAlertModal";

import "../App.css";

function MainMenu() {
  let history = useHistory();

  const {isShowingAlert, toggleAlert} = useAlertModal();

  const [alertTitle, setAlertTitle] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const [showOK, setShowOK]         = useState(false)
  const showCancel = false;
  const showLink   = false;

  function infoPage() {
    let playerName = document.getElementById("playerName").value;
    if (playerName.length === 0) {
      setAlertTitle("Oops!");
      setAlertMessage("Please Enter Your Name");
      toggleAlert();
      setShowOK(true);
      return;
    }

    sessionStorage.setItem("currentPlayerName", playerName);
    sessionStorage.setItem("roundLimit", 6);

    history.push("/infoscreen");
  }

  useEffect(() => {
    sessionStorage.setItem("allowedIn", false);
  }, [])

  let [phrase1, setPhrase1] = useState();
  let [phrase2, setPhrase2] = useState();
  useEffect(() => {
    let catchPhrasesPart1 = [
      "Ace is high, deuce is low,",
      "Ace is high, deuce is low,",
      "Is luck in the cards? Turn 'em and see,"
    ];
    let catchPhrasesPart2 = [
      "Let's make some money, and go, go, go",
      "Call it right, and win the dough",
      "It could bring you some cash currency"
    ];
  
    let num = Math.floor(Math.random() * 3);
    setPhrase1(catchPhrasesPart1[num]);
    setPhrase2(catchPhrasesPart2[num]);
  }, [])

  return (
    <>
      <div className="start-page">
        <input id="playerName" className="name-input" placeholder="Enter Your Name" autoComplete="off"/>
        <button className="gold-button" onClick={infoPage}>Continue</button>
        <Link className="gold-button" to="/highscores">High Scores</Link>
      </div>
      <div className="round-info">
        <p className="intro">{phrase1}<br />{phrase2}
        <br />on <br /><span className="title-font">CARD<br />SHARKS!</span></p>
      </div>
      <AlertModal 
        isShowing  = {isShowingAlert}
        hide       = {toggleAlert}
        title      = {alertTitle}
        message    = {alertMessage}
        showOK     = {showOK}
        showCancel = {showCancel}
        showLink   = {showLink}
      />
    </>
  )
}

export default MainMenu
