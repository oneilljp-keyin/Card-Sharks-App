import { useEffect, useState } from "react";
import axios from "axios";

import useResultModal from "./useResultModal";
import useChoiceModal from "./useChoiceModal";
import useAlertModal from "./useAlertModal";
import ResultsModal from "./Results";
import AlertModal from "./PopUpAlert";
import ChoiceModal from "./Choice";

import CardValue from "./CardValue";

import '../App.css';
import { v4 as uuidv4 } from 'uuid'; // then use uuidv4() to insert id

import goldBack from "../assets/cs_back_gold.png";
import right from "../assets/right.png";
import wrong from "../assets/wrong.png";
import push from "../assets/push.png";

//-------------------------------------------------------------------------------
// this uses https://deckofcardsapi.com/ for drawing cards for display
//-------------------------------------------------------------------------------

function Money() {
  // checks to see if user has completed main round
  const {isShowingAlert, toggleAlert} = useAlertModal();

  const [alertTitle, setAlertTitle]     = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [pathString, setPathString]     = useState();
  const [buttonLabel, setbuttonLabel]   = useState();

  const showOK     = false;
  const showCancel = false;
  const [showLink, setShowLink]     = useState(false)

  useEffect(() => {
    let allowedIn = sessionStorage.getItem("allowedIn");
    console.log("Is This Working??", allowedIn)
    if (!allowedIn || allowedIn === "false") {
      setAlertTitle("I'm Sorry");
      setAlertMessage("You must play the Main Game to get to the Money Game");
      setPathString("/");
      setbuttonLabel("Main Menu");
      toggleAlert();
      setShowLink(true)
    }
  }, [])

  const playerName = sessionStorage.getItem("currentPlayerName");
  let   roundLimit = parseInt(sessionStorage.getItem("roundLimit"));

  let placeholder = [];
  placeholder.push(
      <img key="gold-card" src={goldBack} alt="Card Shards" className="display-card" />
  );

  const {isShowingResult, toggleResult}         = useResultModal();
  const {isShowingChoice, toggleChoice}         = useChoiceModal();

  const [directions, setDirections]             = useState("Press Start to Play");
  const [roundNum, setRoundNum]                 = useState(0);

  const [bankTotal, setBankTotal]               = useState(10000);
  const [betMax, setBetMax]                     = useState(10000);
  const [roundMax, setRoundMax]                 = useState(10000);
  const [roundMin, setRoundMin]                 = useState(1000);

  const [currentCardValue, setCurrentCardValue] = useState();
  const [nextCards, setNextCards]               = useState();
  const [drawCards, setDrawCards]               = useState();
  const [drawPileNumber, setDrawPileNumber]     = useState(0);
  
  const [roundResult, setRoundResult]           = useState("Good Luck!");
  const [rightWrong, setRightWrong]             = useState();
  const [resultWL, setResultWL]                 = useState();
  const [resultHeader, setResultHeader]         = useState("Congratulations " + playerName);
  const [resultTag, setResultTag]               = useState();


  const [displayCards, setDisplayCards]         = useState([]);
  const [revealCard, setRevealCard]             = useState(placeholder);
  const [startButton, setStartButton]           = useState("Start");

  const [startDisplay, setStartDisplay]         = useState(false);
  const [showResults, setShowResults]           = useState(false);
  const [continueDis, setContinuDis]            = useState(false);
  const [showBtns, setShowBtns]                 = useState(false);
  const [highBtnDis, setHighBtnDis]             = useState(false);
  const [lowBtnDis, setLowBtnDis]               = useState(false);
  const [swapOutDis, setSwapOutDis]             = useState(false);
  const [swapOutUsed, setSwapOutUsed]           = useState(false);
  const [wagerDis, setWagerDis]                 = useState(true);
  
  // retreives a randomize deck and cards need for game
  useEffect(() => {
    let startPileNum = 7;
    const fetchDeck = async () => {
      let deck = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      let deckJSON = await deck.json();

      let first = await fetch(`https://deckofcardsapi.com/api/deck/${deckJSON.deck_id}/draw/?count=${startPileNum}`);
      let firstJSON = await first.json();
  
      setNextCards(firstJSON);

      let second = await fetch(`https://deckofcardsapi.com/api/deck/${deckJSON.deck_id}/draw/?count=1`)
      let secondJSON = await second.json();

      setDrawCards(secondJSON);
    }

    fetchDeck();
  }, []);

  // -------- starts the game and stores the value of first card for comparison ------------------ \\
  function showFirstCard() {
    let data = nextCards;

    setShowBtns(true);
    setStartDisplay(true);
    setWagerDis(false);
    setStartButton("Good Luck!");
    setDirections("Is The Next Card Higher or Lower?")

    let nextKey = uuidv4();

    let firstValue = CardValue(data.cards[roundNum].value);
    setCurrentCardValue(firstValue);

    let outputArray = [];

    outputArray.push(
        <img key={nextKey} src={data.cards[roundNum].image} alt={data.cards[roundNum].code} className="display-card" />
    );

    setDisplayCards(outputArray);
    setRoundNum(previousValue => previousValue + 1);
  }
  // --------------------------------------------------------------------------------------------- \\

  // -------- compares the checks and see if player is correct ----------------------------------- \\
  function nextCard(option) {
    let cards = nextCards;
    let num = roundNum;
    let hiLow = option;

    // Check wager amount
    let wagerAmount = parseInt(document.getElementById("wager").value);
    if (wagerAmount > roundMax) {
      alert("Bet is too high!");
      return;
    } else if (wagerAmount < roundMin) {
      alert("Bet is too low");
      return;
    }

    // get value of next card
    let nextCardValue;
    nextCardValue = CardValue(cards.cards[num].value);

    // compare values and adjust bank total if necessary
    let newBank = bankTotal;
    if (nextCardValue === currentCardValue) {
      setRoundResult("Push");
      setRightWrong(push)
    } else if ((hiLow === "higher" && nextCardValue > currentCardValue) ||
      (hiLow === "lower" && nextCardValue < currentCardValue)) {
        setRoundResult("Correct");
        setRightWrong(right)
        setResultWL(true);
        newBank += wagerAmount;
        setResultTag(`You won $${newBank.toLocaleString()}`);
      } else {
        setRoundResult("Incorrect");
        setRightWrong(wrong)
        setResultWL(false);
        newBank -= wagerAmount;
        if (newBank === 0) {
          setResultHeader(`Sorry ${playerName}`);
          setResultTag("Better luck next time");
        }
      }

    // set bank total and bet limits, delay to prevent spoiling before card is revealed
    setTimeout(function() {
      setBankTotal(newBank);
      setBetMax(newBank);
      setRoundMax(newBank);
    }, 2900);

    // when final round, sets min bet to half total and displays option modal
    if (roundNum + 1 === roundLimit && newBank !== 0) {
      setRoundMin(newBank / 2);
      setTimeout(function() {
        toggleChoice()
      }, 4000);
    }
    setWagerDis(true);
    setCurrentCardValue(nextCardValue);

    // sets card to rotate to reveal and delays continue button until shown
    let cardAnime = "reveal 3s ease 0s 1 normal forwards running";
    let resultReveal = "result 4s ease 0s 1 normal forwards running";
    document.querySelector("#flip-card-inner").style.animation = cardAnime;
    document.querySelector("#flip-card-back").style.animation  = cardAnime;
    document.querySelector("#right-wrong").style.animation  = resultReveal;

    setShowResults(true);
    if(roundNum === roundLimit || newBank === 0) {
      setContinuDis(true);
    }

    let nextKey = uuidv4();
    let addToArray = [];
    addToArray.push(
        <img key={nextKey} src={cards.cards[num].image} alt={cards.cards[num].code} className="display-card" />
    );

    setRevealCard(addToArray);
    setHighBtnDis(true);
    setLowBtnDis(true);
    if (!swapOutUsed) {
      setSwapOutDis(true)
    }

    // triggers result modal after round 6 or when bank hits 0
    if (roundNum === roundLimit || newBank === 0) {
      setTimeout(function() {
        console.log("Round Over");
        toggleResult();
        setShowResults(false);
      }, 4000);
      if (newBank !== 0) {
        SaveHighScore(playerName, newBank);
        console.log("Update High Scores");
      }
    }
  }
  // --------------------------------------------------------------------------------------------- \\

  // -------- sets up cards & buttons for next round --------------------------------------------- \\
  function setNextRound() {
    setDisplayCards(revealCard);
    setRoundNum(previousValue => previousValue + 1);
    setRevealCard(placeholder);
    setShowResults(false);

    setHighBtnDis(false);
    setLowBtnDis(false);
    setWagerDis(false);
    if (!swapOutUsed) {
      setSwapOutDis(false)
    }

    document.querySelector("#flip-card-inner").style.removeProperty("animation");
    document.querySelector("#flip-card-back").style.removeProperty("animation");
    document.querySelector("#right-wrong").style.removeProperty("animation");
  }
  // ------------------------------------------------------------------------------------------- \\

  // -------- Swith out the base card for the next card in draw pile --------------------------- \\
  function swapOutCard() {
    setSwapOutUsed(true);
    setSwapOutDis(true);

    let replaceBaseCard = [];
    let pileNum = drawPileNumber;
    let swapCards = drawCards;
    let swapKey = uuidv4();

    replaceBaseCard.push(
        <img key={swapKey} src={swapCards.cards[pileNum].image} alt={swapCards.cards[pileNum].code} className="display-card" />
    );
    
    setDrawPileNumber(previousValue => previousValue + 1);
    let replaceCardValue = CardValue(swapCards.cards[pileNum].value);

    setCurrentCardValue(replaceCardValue);
    setDisplayCards(replaceBaseCard);

    return
  }
  // --------------------------------------------------------------------------------------------- \\

  function SaveHighScore(name, score) {

    console.log("Step #1", name, " ", score)

    // useEffect(() => {
    //   sendToServer(name, score);
    // }, [])
  
    const sendToServer = async ( name, score ) => {
  
      console.log("Step #2", name, " ", score)

      const d = new Date();
      var date = (d.getFullYear()) + "-" + 
                ((d.getMonth()+1)).toString().padStart(2, '0') + "-" +
                (d.getDate()).toString().padStart(2, '0');
  
      let formData = new FormData();
      formData.append("user_date",  date);
      formData.append("user_name",  name);
      formData.append("user_score", score);
  
      const response = await axios.post("https://johnny-o.net/card-sharks/high_scores.php", formData, {
        headers:{'Content-Type': 'application/json'}
      });
  
      console.log(response);
    }

    sendToServer(name, score);
  
  };

  function submitScore() {
    setRoundNum(previousValue => previousValue + 1);
    toggleChoice();
    toggleResult();
    setShowResults(false);
    if (bankTotal > 0) {
      SaveHighScore(playerName, bankTotal);
    }
  }

  // -------- Alert Modal ------------------------------------------------------------------------ \\
  function mainMenu() {
    setAlertTitle("Are you sure?");
    setAlertMessage("All progress will be lost");
    toggleAlert();
    setPathString("/");
    setbuttonLabel("Main Menu");
  }
  // --------------------------------------------------------------------------------------------- \\

  return (
    <>
      <div className="header" style={{ display: showResults ? "none" : "block" }}>
        <button className="gold-button" disabled={startDisplay} onClick={showFirstCard}>{startButton}</button>
      </div>
      <div className="header" style={{ display: showResults ? "block" : "none" }}>
        <table className="rightwrong" id="right-wrong">
          <tbody>
            <tr>
              <td><img className="result" src={rightWrong} alt="Result" /></td>
              <td><button id="continue" className="gold-button" disabled={continueDis} onClick={setNextRound}>Continue</button></td>
              <td>{roundResult}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="Card-Container">
        <div className="card">
          {displayCards}
        </div>
      </div>
      <div className="flip-card">
        <div className="flip-card-inner" id="flip-card-inner">
          <div className="flip-card-front">
            <img className="display-card" src={goldBack} alt="Card Sharks" />
          </div>
          <div className="flip-card-back" id="flip-card-back">
            {revealCard}
          </div>
        </div>
      </div>
      <div className="directions">{directions}</div>
      <div className="round-info">{roundNum > 0 ? <span className="header-message">Round {roundNum} - Place Wager Below</span> : <span className="header-message">Welcome To The MONEY Round {playerName}</span>}</div>
      <div className="buttons" style={{ display: showBtns ? "block" : "none" }}>
        <button id="higherBtn" className="gold-button" disabled={highBtnDis} onClick={() => nextCard("higher")}>Higher</button><br />
        <button id="lowerBtn"  className="gold-button" disabled={lowBtnDis}  onClick={() => nextCard("lower")}>Lower</button><br />
        <button id="swapBtn"   className="gold-button" disabled={swapOutDis} onClick={swapOutCard}>Swap Card</button><br />
      </div>
      <div className="tips">
        <span className="header-message">Bank Total: ${bankTotal.toLocaleString()}</span><br />
        <input disabled={wagerDis} id="wager" type="number" min={roundMin} max={roundMax} step="500" pattern="[0-9]*" value={betMax} onChange={e => setBetMax(parseInt(e.target.value))}/><br />
        <span className="header-message">Minimum Bet is ${roundMin.toLocaleString()}</span>
        <p><strong>2</strong> is the lowest card - <strong>ACE</strong> is the highest card</p>
        <p>If the cards have the same value, it is considered a push,<br /> 
        you will not win or lose any money</p>
        <p>You can swap out your base card <strong>ONLY ONCE</strong></p>
      </div>
      <div className="footer-button">
        <button id="menuBtn"   className="gold-button" onClick={mainMenu}>Main Menu</button>
      </div>
      <ResultsModal
        isShowing = {isShowingResult}
        hide      = {toggleResult}
        result    = {resultWL}
        header    = {resultHeader}
        tag       = {resultTag}
        money     = {true}
      />
      <ChoiceModal
        isShowing = {isShowingChoice}
        hide      = {toggleChoice}
        name      = {playerName}
        money     = {bankTotal}
        baseCard  = {revealCard}
        setRound  = {submitScore}
        swapCard  = {swapOutUsed}
      />
      <AlertModal 
        isShowing  = {isShowingAlert}
        hide       = {toggleAlert}
        title      = {alertTitle}
        message    = {alertMessage}
        path       = {pathString}
        button     = {buttonLabel}
        showOK     = {showOK}
        showCancel = {showCancel}
        showLink   = {showLink}
      />

    </>
  );
}

export default Money;
