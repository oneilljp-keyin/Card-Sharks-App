import React from 'react';
import "./NewDeck.css";

export default function NewDeck() {
    let suits = ["S", "D", "C", "H"];
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    let returnedDeck = [];

    function getDeck(){
        let deck = [];

        for(var i = 0; i < suits.length; i++)
        {
            for(var x = 0; x < values.length; x++)
            {
                var card = {Value: values[x], Suit: suits[i]};
                deck.push(card);
            }
        }
        return deck;
    }

    function shuffle(deck){
        // for 1000 turns
        // switch the values of two random cards
        for (var i = 0; i < 1000; i++)
        {
            var location1 = Math.floor((Math.random() * deck.length));
            var location2 = Math.floor((Math.random() * deck.length));
            var tmp = deck[location1];

            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }
    }

    function renderDeck(deck) {
        document.getElementById('deck').innerHTML = '';

        for(var i = 0; i < deck.length; i++) {
            var card = document.createElement("div");
            var icon = '';
            if (deck[i].Suit === 'H')
            icon = '&hearts;';
            else if (deck[i].Suit === 'S')
            icon = '&spades;';
            else if (deck[i].Suit === 'D')
            icon = '&diams;';
            else
            icon = '&clubs;';

            card.innerHTML = deck[i].Value + '' + icon;
            card.className = 'card';

            document.getElementById("deck").appendChild(card);
        }
    }

    let deck1 = getDeck();
    console.log(deck1);
    shuffle(deck1);
    renderDeck(deck1);

    return (
        <div className="App deck">
          <h1>This is a New Deck Test</h1>
          <div id="deck"></div>
        </div>
    )
}
