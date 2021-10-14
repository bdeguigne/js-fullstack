import React from 'react';
import '../InGame.css';
import cards from '../Cards';

export default function Board() {
  const Deck = { cards };

  // const GameStatus = {
  //   NOTSTARTED: 0,
  //   FINISHED: 1,
  //   INPROGRESS: 2,
  // };

  const textwinner = '';

  function shuffle() {
    for (let index = cards.length - 1; index > 0; index -= 1) {
      const NewIndex = Math.floor(Math.random() * (index + 1));
      const oldValue = cards[NewIndex];
      cards[NewIndex] = cards[index];
      cards[index] = oldValue;
    }
    return cards;
  }

  Deck.cards = shuffle();
  const deckMidpoint = Math.ceil(Deck.cards.length / 2);
  const playerDeck = Deck.cards.slice(0, deckMidpoint);
  const computerDeck = Deck.cards.slice(deckMidpoint, Deck.cards.length);

  console.log('Payer Deck ==>', playerDeck);
  console.log('Computer Deck ==>', computerDeck);
  console.log(Deck);

  return (
    <div className="board">
      <div className="computer-deck deck">
        {/* <img src={Deck.cards[0].assets} alt="ImageCard" /> */}
      </div>
      <div className="computer-card-slot card-slot" />
      <div className="text">{textwinner}</div>
      <div className="player-deck deck" />
      <div className="player-card-slot card-slot" />
    </div>
  );
}
