import { useEffect, useState } from "react";
import './App.css';
// import NewDeck from "./NewDeck";
import { v4 as uuidv4 } from 'uuid'; // then use uuidv4() to insert id

function App() {
  const [roundNum, setRoundNum]                 = useState(0);
  const [currentKey, setCurrentKey]             = useState();
  const [currentCardValue, setCurrentCardValue] = useState()
  const [deckID, setDeckID]                     = useState();
  const [nextCards, setNextCards]               = useState();
  const [roundResult, setRoundResult]           = useState("Good Luck");
  const [turnsRemain, setTurnsRemain]           = useState(3);
  const [swapOut, setSwapOut]                   = useState(true);
  const [displayCards, setDisplayCards]         = useState([]);
  
  useEffect(() => {
    console.log("This Should Be Step #1");
    const fetchDeck = async () => {
    
      let data = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      let json = await data.json();

      setDeckID(json.deck_id);

      console.log(json);
      console.log(deckID);
    }

    fetchDeck();
  }, []);

  const fetchNewDeck = async () => {
    console.log("This Should Be Step #2");

    let deckNum = deckID;
    console.log(deckNum)
  
    let data = await fetch(`https://deckofcardsapi.com/api/deck/${deckNum}/draw/?count=7`);
    let json = await data.json();

    setNextCards(json);

    console.log(json);

    return
  }

  function nextCardValue() {
    let data = nextCards;
    if (data.cards[roundNum].value === "ACE")   {setCurrentCardValue(14);} else
    if (data.cards[roundNum].value === "KING")  {setCurrentCardValue(13);} else 
    if (data.cards[roundNum].value === "QUEEN") {setCurrentCardValue(12);} else 
    if (data.cards[roundNum].value === "JACK")  {setCurrentCardValue(11);} else
       {setCurrentCardValue(data.cards[roundNum].value)};

    return
  }

  function showFirstCard() {
    fetchNewDeck();
    let data = nextCards;
    console.log(data);

    let outputArray = [];

    let nextKey = uuidv4();
    setCurrentKey(nextKey);
    
    outputArray.push(<div className="card" key={nextKey}><img src={data.cards[roundNum].image} alt={data.cards[roundNum].code} className="Display-Card" /></div>);
    setDisplayCards(outputArray);

    console.log(currentKey);
    console.log(currentCardValue);
  }

  function nextCardHigher() {
    let currentValue = currentCardValue;
    let cards = nextCards;

    setRoundNum(prevState => [...prevState, prevState + 1]);
    let nextCard = cards.cards[roundNum].value;

    if (currentValue < nextCard) {
      setRoundResult("Correct");
    } else {
      setRoundResult("Incorrect");
      setTurnsRemain(turnsRemain - 1);
    }
    let nextKey = uuidv4();
    setCurrentKey(nextKey);
    let showNextCard = `<div className="card" key=${nextKey}><img src=${cards.cards[roundNum].image} alt=${cards.cards[roundNum].code} className="Display-Card" /></div>`;

    setDisplayCards(prevArray => [...prevArray, showNextCard]);

    nextCardValue();
  }

  function nextCardLower() {
    return
  }

  function swapOutCard() {
    return
  }

  return (
    <div className="App">
      <button onClick={showFirstCard}>Start the Game</button><br />
      <div className="Card-Container">
        {displayCards}<br />
      </div>
      <div>{roundResult}</div>
      <button onClick={nextCardLower}>Lower</button>
      <button onClick={nextCardHigher}>Higher</button>
      <button onClick={swapOutCard}>Swap Out Card</button>
    </div>
  );
}

export default App;
