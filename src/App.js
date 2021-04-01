import { useEffect, useState } from "react";
import './App.css';
import { v4 as uuidv4 } from 'uuid'; // then use uuidv4() to insert id
import csLogo from "./assets/Card_Sharks_2019_logo.png";

function App() {
  const [directions, setDirections]             = useState("Welcome To Card Sharks - Press Start to Play");
  const [roundNum, setRoundNum]                 = useState(0);

  const [currentKey, setCurrentKey]             = useState();
  const [currentCardValue, setCurrentCardValue] = useState()
  const [nextCards, setNextCards]               = useState();
  const [drawCards, setDrawCards]               = useState();
  const [roundResult, setRoundResult]           = useState("Good Luck!");
  const [turnsRemain, setTurnsRemain]           = useState(3);
  const [displayCards, setDisplayCards]         = useState([]);
  const [startButton, setStartButton]           = useState("Start");
  const [startDisplay, setStartDisplay]         = useState(false);

  const [showBtns, setShowBtns]                 = useState(false);
  const [highBtn, setHighBtn]                   = useState(false);
  const [lowBtn, setLowBtn]                     = useState(false);
  const [swapOut, setSwapOut]                   = useState(false);
  
  useEffect(() => {
    const fetchDeck = async () => {
      let deck = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      let deckJSON = await deck.json();
      console.log(deckJSON);

      let first = await fetch(`https://deckofcardsapi.com/api/deck/${deckJSON.deck_id}/draw/?count=7`);
      let firstJSON = await first.json();
  
      setNextCards(firstJSON);

      let second = await fetch(`https://deckofcardsapi.com/api/deck/${deckJSON.deck_id}/draw/?count=4`)
      let secondJSON = await second.json();
  
      setDrawCards(secondJSON);
  
      console.log(firstJSON);
      console.log(firstJSON);
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

  function showFirstCard() {
    let data = nextCards;

    setShowBtns(true);
    setStartDisplay(true);
    setStartButton("Good Luck!");

    let nextKey = uuidv4();
    setCurrentKey(nextKey);

    let firstValue = parseInt(cardValue(data.cards[roundNum].value));
    setCurrentCardValue(firstValue);

    let outputArray = [];

    outputArray.push(
      <div className="card" key={nextKey}>
        <img src={data.cards[roundNum].image} alt={data.cards[roundNum].code} className="Display-Card" />
      </div>
    );

    setDisplayCards(outputArray);
    setRoundNum(previousValue => previousValue + 1);
  }

  function nextCard(option) {
    let cards = nextCards;
    let num = roundNum;
    let hiLow = option;

    let NextCardValue = parseInt(cardValue(cards.cards[num].value));

    if (NextCardValue > currentCardValue) {
      if (hiLow === "higher") {
        setRoundResult("Correct");
      } else {
        setRoundResult("Incorrect");
        setTurnsRemain(previousValue => previousValue - 1);
      }
    } else {
      if (hiLow === "lower") {
        setRoundResult("Correct");
      } else {
        setRoundResult("Incorrect");
        setTurnsRemain(previousValue => previousValue - 1);
      }
    }
    let NextKey = uuidv4();
    setCurrentKey(NextKey);
    let AddToArray = [];
    AddToArray.push(
      <div className="card" key={NextKey}>
        <img src={cards.cards[num].image} alt={cards.cards[num].code} className="Display-Card" />
      </div>
    );

    setCurrentCardValue(NextCardValue);
    setDisplayCards(oldArray => [...oldArray, AddToArray]);
    setRoundNum(previousValue => previousValue + 1);
    console.log(displayCards);
  }

  function swapOutCard() {
    setSwapOut(true);
    return
  }

  return (
    <div className="App">
      <img className="logo" src={csLogo} alt="Card Sharks" />
      <div className="header"><button disabled={startDisplay} onClick={showFirstCard}>{startButton}</button></div>
      <div className="Card-Container">
        {displayCards}<br />
      </div>
      <div className="directions">{directions}</div>
      <div className="buttons" style={{ display: showBtns ? "block" : "none" }}>{roundResult}<br />
      <button id="higherBtn" disabled={highBtn} onClick={() => nextCard("higher")}>Higher</button><br /><br />
      <button id="lowerBtn"  disabled={lowBtn} onClick={() => nextCard("lower")}>Lower</button><br />
      <button id="swapBtn"   disabled={swapOut} onClick={swapOutCard}>Swap Out Card</button><br />
      Turns Left: {turnsRemain}</div>
    </div>
  );
}

export default App;
