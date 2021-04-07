import { useEffect, useState } from "react";
import useModal from "./useModal";
import Modal from "./Results";

import '../App.css';
import { v4 as uuidv4 } from 'uuid'; // then use uuidv4() to insert id

import blueBack from "../assets/cs_back_blue.png";
// import redBack from "./assets/cs_back_red.png";
import right from "../assets/right.png";
import wrong from "../assets/wrong.png";

//-------------------------------------------------------------------------------
// this uses https://deckofcardsapi.com/ for drawing cards for display
//-------------------------------------------------------------------------------

function Game() {
  const playerName = sessionStorage.getItem("currentPlayerName");
  let   roundLimit = parseInt(sessionStorage.getItem("roundLimit"));

  let placeholder = [];
  placeholder.push(
      <img src={blueBack} alt="Card Shards" className="display-card" />
  );

  const {isShowing, toggle} = useModal();

  const [directions, setDirections]             = useState("Press Start to Play");
  const [roundNum, setRoundNum]                 = useState(0);






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
  const [showBtns, setShowBtns]                 = useState(false);
  const [highLowDis, setHighLowDis]             = useState(false);
  const [swapOutDis, setSwapOutDis]             = useState(false);
  const [swapOutUsed, setSwapOutUsed]           = useState(false);
  
  useEffect(() => {
    let startPileNum = roundLimit + 1;
    const fetchDeck = async () => {
      let deck = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      let deckJSON = await deck.json();

      let first = await fetch(`https://deckofcardsapi.com/api/deck/${deckJSON.deck_id}/draw/?count=${startPileNum}`);
      let firstJSON = await first.json();
  
      setNextCards(firstJSON);

      let second = await fetch(`https://deckofcardsapi.com/api/deck/${deckJSON.deck_id}/draw/?count=4`)
      let secondJSON = await second.json();

      console.log(firstJSON);
      console.log(secondJSON);
  
      setDrawCards(secondJSON);
    }

    fetchDeck();
  }, []);

  function cardValue(cardValue) {
    let value = cardValue;
    if (value === "ACE")   {return 14;} else
    if (value === "KING")  {return 13;} else 
    if (value === "QUEEN") {return 12;} else 
    if (value === "JACK")  {return 11;} else
       {return value};
  }

  // -------- starts the game and stores the value of first card for comparison ------------------ \\
  function showFirstCard() {
    let data = nextCards;

    setShowBtns(true);
    setStartDisplay(true);
    setStartButton("Good Luck!");
    setDirections("Is The Next Card Higher or Lower?")

    let nextKey = uuidv4();

    let firstValue = parseInt(cardValue(data.cards[roundNum].value));
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
    let cards;
    let num;
    let hiLow = option;
    let rightOrWrong;

    let nextCardValue;
    let gameOver = false;

    if (rightWrong === wrong) {
      cards = drawCards;
      num = drawPileNumber
      nextCardValue = parseInt(cardValue(cards.cards[num].value));
      setDrawPileNumber(previousValue => previousValue + 1);
    } else {
      cards = nextCards;
      num = roundNum;
      nextCardValue = parseInt(cardValue(cards.cards[num].value));
    }

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
        setTurnsRemain(previousValue => previousValue - 1);
        setResultWL(false);
      }  

    console.log(`${hiLow} - Base Card: ${currentCardValue} - Next Card: ${nextCardValue} ${rightOrWrong}`);

    let cardAnime = "reveal 4s forward";
    document.querySelector("#flip-card-inner").style.animation = cardAnime;
    document.querySelector("#flip-card-back").style.animation  = cardAnime;

    setShowResults(true);

    let addToArray = [];
    addToArray.push(
        <img src={cards.cards[num].image} alt={cards.cards[num].code} className="display-card" />
    );

    setRevealCard(addToArray);
    setHighLowDis(true);
    if (!swapOutUsed) {
      setSwapOutDis(true);
    }

    if (((roundNum === roundLimit) && rightOrWrong) || gameOver) {
      console.log("Round Over");
      toggle();
      setShowResults(false);
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
        <img src={swapCards.cards[pileNum].image} alt={swapCards.cards[pileNum].code} className="display-card" />
      </div>
    );
    
    setDrawPileNumber(previousValue => previousValue + 1);
    let replaceCardValue = parseInt(cardValue(swapCards.cards[pileNum].value));

    setCurrentCardValue(replaceCardValue);
    setDisplayCards(replaceBaseCard);

    return
  }
  // --------------------------------------------------------------------------------------------- \\

  return (
    <>
      <div className="header" style={{ display: showResults ? "none" : "block" }}>
        <button className="gold-button" disabled={startDisplay} onClick={showFirstCard}>{startButton}</button>
      </div>
      <div className="header" style={{ display: showResults ? "block" : "none" }}>
        <table className="rightwrong">
          <tbody>
            <tr>
              <td><img className="result" src={rightWrong} alt="Result" /></td>
              <td><button id="continue" className="gold-button" onClick={setNextRound}>Continue</button></td>
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
      <div class="flip-card">
        <div class="flip-card-inner" id="flip-card-inner">
          <div class="flip-card-front">
            <img className="display-card" src={blueBack} alt="Card Sharks" />
          </div>
          <div class="flip-card-back" id="flip-card-back">
            {revealCard}
          </div>
        </div>
      </div>
      {/* <div className="flip-card">
        <div className="card" key="reveal-card">
          {revealCard}
        </div>
      </div> */}
      <div className="directions">{directions}</div>
      <div className="round-info">{roundNum > 0 ? <h2>Round {roundNum}</h2> : <h2>Hello {playerName} and Welcome To Card Sharks</h2>}</div>
      <div className="buttons" style={{ display: showBtns ? "block" : "none" }}>
        <button id="higherBtn" className="gold-button" disabled={highLowDis} onClick={() => nextCard("higher")}>Higher</button><br />
        <button id="lowerBtn"  className="gold-button" disabled={highLowDis} onClick={() => nextCard("lower")}>Lower</button><br />
        <button id="swapBtn"   className="gold-button" disabled={swapOutDis} onClick={swapOutCard}>Swap Card</button><br />
        Wrong Guesses Remain: {turnsRemain}</div>
      <div className="tips">
        <p>If the cards have the same value, you will lose a guess</p>
        <p>You can change your base card <strong>ONLY ONCE</strong></p>
        <p><strong>2</strong> is the lowest card - <strong>ACE</strong> is the highest card</p>
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        result={resultWL}
        header={resultHeader}
        tag={resultTag}
      />
    </>
  );
}

export default Game;
