export const fetchDeck = async (setRoundLimit, setNextCards) => {
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

  export function showFirstCard(setShowBtns, setStartDisplay) {
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