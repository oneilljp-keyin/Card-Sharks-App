import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useResultModal from "./useResultModal";
import ResultsModal from "./Results";
import CardValue from "./CardValue";

import '../App.css';
import { v4 as uuidv4 } from 'uuid'; // then use uuidv4() to insert id

import blueBack from "../assets/cs_back_blue.png";
import right from "../assets/right.png";
import wrong from "../assets/wrong.png";

//-------------------------------------------------------------------------------
// this uses https://deckofcardsapi.com/ for drawing cards for display
//-------------------------------------------------------------------------------

function Game() {
  const playerName = sessionStorage.getItem("currentPlayerName");
  const history = useHistory();

  let placeholder = [];
  placeholder.push(
      <img key={uuidv4()} src={blueBack} alt="Card Shards" className="display-card" />
  );

  const {isShowingResult, toggleResult} = useResultModal();

  const [directions, setDirections]             = useState("Press Start to Play");
  const [roundNum, setRoundNum]                 = useState(0);
  const [roundLimit, setRoundLimit]             = useState()

  const [currentCardValue, setCurrentCardValue] = useState()
  const [nextCards, setNextCards]               = useState();
  const [drawCards, setDrawCards]               = useState();
  const [drawPileNumber, setDrawPileNumber]     = useState(0);
  
  const [roundResult, setRoundResult]           = useState("Good Luck!");
  const [rightWrong, setRightWrong]             = useState();
  const [resultWL, setResultWL]                 = useState();
  const [resultHeader, setResultHeader]         = useState("Congratulations " + playerName);
  const [resultTag, setResultTag]               = useState("You made it to the Money Round");
  
  const [turnsRemain, setTurnsRemain]           = useState(3);
  const [displayCards, setDisplayCards]         = useState([]);
  const [revealCard, setRevealCard]             = useState(placeholder);
  const [startButton, setStartButton]           = useState("Start");

  const [startDisplay, setStartDisplay]         = useState(false);
  const [showResults, setShowResults]           = useState(false);
  const [continueDis, setContinuDis]            = useState(false);
  const [showBtns, setShowBtns]                 = useState(false);
  const [highLowDis, setHighLowDis]             = useState(false);
  const [swapOutDis, setSwapOutDis]             = useState(false);
  const [swapOutUsed, setSwapOutUsed]           = useState(false);
  
  // retreives a randomize deck and cards need for game
  useEffect(() => {
    const fetchDeck = async () => {
      let   roundLimit = parseInt(sessionStorage.getItem("roundLimit"));
      setRoundLimit(roundLimit);
      const startPileNum = roundLimit + 1;

      let deck = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      let deckJSON = await deck.json();

      let first = await fetch(`https://deckofcardsapi.com/api/deck/${deckJSON.deck_id}/draw/?count=${startPileNum}`);
      let firstJSON = await first.json();
  
      setNextCards(firstJSON);

      let second = await fetch(`https://deckofcardsapi.com/api/deck/${deckJSON.deck_id}/draw/?count=4`)
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
    setStartButton("Good Luck!");
    setDirections("Is The Next Card Higher or Lower?")

    let firstValue = parseInt(CardValue(data.cards[roundNum].value));
    setCurrentCardValue(firstValue);

    let outputArray = [];

    outputArray.push(
        <img key={uuidv4()} src={data.cards[roundNum].image} alt={data.cards[roundNum].code} className="display-card" />
    );

    setDisplayCards(outputArray);
    setRoundNum(previousValue => previousValue + 1);
  }
  // --------------------------------------------------------------------------------------------- \\

  // -------- compares the checks and see if player is correct ----------------------------------- \\
  function nextCard(option) {
    let cards;
    let num;
    let hiLow = option;
    let rightOrWrong;

    let nextCardValue;
    let gameOver = false;

    // get value of next card
    if (rightWrong === wrong) {
      cards = drawCards;
      num = drawPileNumber
      setDrawPileNumber(previousValue => previousValue + 1);
    } else {
      cards = nextCards;
      num = roundNum;
    }
    nextCardValue = CardValue(cards.cards[num].value);

    // compare card values
    if ((hiLow === "higher" && nextCardValue > currentCardValue) ||
      (hiLow === "lower" && nextCardValue < currentCardValue)) {
        setRoundResult("Correct");
        setRightWrong(right);
        rightOrWrong = true;
        setCurrentCardValue(nextCardValue);
        setResultWL(true);
      } else {
        setRoundResult("Incorrect");
        setRightWrong(wrong)
        rightOrWrong = false;
        if (turnsRemain === 1) {
          gameOver = true;
          setResultHeader(`Sorry ${playerName}`);
          setResultTag("Better luck next time");    
        }
        setTimeout(function() {
          setTurnsRemain(previousValue => previousValue - 1);
        }, 3000);
        setResultWL(false);
      }  

    // sets card to rotate to reveal and delays continue button until shown
    let cardAnime    = "reveal 3s ease 0s 1 normal forwards running";
    let resultReveal = "result 3s ease 0s 1 normal forwards running";
    document.querySelector("#flip-card-inner").style.animation = cardAnime;
    document.querySelector("#flip-card-back").style.animation  = cardAnime;
    document.querySelector("#right-wrong").style.animation  = resultReveal;

    setShowResults(true);
    if(gameOver === true) {
      setContinuDis(true);
    }

    let addToArray = [];
    addToArray.push(
        <img key={uuidv4()} src={cards.cards[num].image} alt={cards.cards[num].code} className="display-card" />
    );

    setRevealCard(addToArray);
    setHighLowDis(true);
    if (!swapOutUsed) {
      setSwapOutDis(true);
    }

    // shows modal if round 6 is completed or 3 wrong guesses
    if (((roundNum === roundLimit) && rightOrWrong) || gameOver) {
      if (gameOver) {
        sessionStorage.setItem("allowedIn", false)
      } else {
        sessionStorage.setItem("allowedIn", true)
      }
      setTimeout(function() {
        toggleResult();
        setShowResults(false);
      }, 4000);
    }
  }
  // --------------------------------------------------------------------------------------------- \\

  // -------- sets up cards & buttons for next round --------------------------------------------- \\
  function setNextRound() {
    if (rightWrong !== wrong && turnsRemain !== 0) {
      setDisplayCards(revealCard);
      setRoundNum(previousValue => previousValue + 1);
    }
    setRevealCard(placeholder);
    setShowResults(false);

    setHighLowDis(false);
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
      <div className="card" key={swapKey}>
        <img key={uuidv4()} src={swapCards.cards[pileNum].image} alt={swapCards.cards[pileNum].code} className="display-card" />
      </div>
    );
    
    setDrawPileNumber(previousValue => previousValue + 1);
    let replaceCardValue = CardValue(swapCards.cards[pileNum].value);

    setCurrentCardValue(replaceCardValue);
    setDisplayCards(replaceBaseCard);
  }
  // --------------------------------------------------------------------------------------------- \\

  function mainMenu() {
    if (window.confirm("Are you sure you want to\nreturn to the main menu\n(All progress will be lost)")) {
      history.push("/");
    } else {
      return
    }
  }

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
        <div className="card" key="blueCard">
          {displayCards}
        </div>
      </div>
      <div className="flip-card">
        <div className="flip-card-inner" id="flip-card-inner">
          <div className="flip-card-front">
            <img className="display-card" src={blueBack} alt="Card Sharks" />
          </div>
          <div className="flip-card-back" id="flip-card-back">
            {revealCard}
          </div>
        </div>
      </div>
      <div className="directions">{directions}</div>
      <div className="round-info">{roundNum > 0 ? <h2>Round {roundNum}</h2> : <h2>Hello {playerName}, Good Luck!</h2>}</div>
      <div className="buttons" style={{ display: showBtns ? "block" : "none" }}>
        <button id="higherBtn" className="gold-button" disabled={highLowDis} onClick={() => nextCard("higher")}>Higher</button><br />
        <button id="lowerBtn"  className="gold-button" disabled={highLowDis} onClick={() => nextCard("lower")}>Lower</button><br />
        <button id="swapBtn"   className="gold-button" disabled={swapOutDis} onClick={swapOutCard}>Swap Card</button><br />
        Wrong Guesses Remain: {turnsRemain}</div>
      <div className="tips">
        <p><strong>2</strong> is the lowest card - <strong>ACE</strong> is the highest card</p>
        <p>If the cards have the same value, you will lose a guess</p>
        <p>You can change your base card <strong>ONLY ONCE</strong></p>
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
        money     = {false}
      />
    </>
  );
}

export default Game;
