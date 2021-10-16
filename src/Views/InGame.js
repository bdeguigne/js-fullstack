import React from 'react';
import '../InGame.css';
import cards from '../Cards';

export default function Board() {
  // const GameStatus = {
  //   NOTSTARTED: 0,
  //   FINISHED: 1,
  //   INPROGRESS: 2,
  // };

  function shuffle() {
    for (let index = cards.length - 1; index > 0; index -= 1) {
      const NewIndex = Math.floor(Math.random() * (index + 1));
      const oldValue = cards[NewIndex];
      cards[NewIndex] = cards[index];
      cards[index] = oldValue;
    }
    return cards;
  }

  const textwinner = '';
  const [Deck] = React.useState(shuffle());
  const [playerADeck, setplayerADeck] = React.useState([]);
  const [PlayerBDeck, setplayerBDeck] = React.useState([]);

  React.useEffect(() => {
    const deckMidpoint = Math.ceil(Deck.length / 2);
    setplayerADeck(Deck.slice(0, deckMidpoint));
    setplayerBDeck(Deck.slice(deckMidpoint, Deck.length));
  }, [Deck]);

  React.useEffect(() => {
    console.log('Player A Black =>', playerADeck);
    console.log('Player A White =>', PlayerBDeck);
  }, [playerADeck, PlayerBDeck]);

  return (
    <div className="board">
      <div className="computer-deck deck">
        <img
          className="card"
          src={playerADeck[0]?.assets_black}
          alt="ImageCard"
        />
      </div>
      <div className="computer-card-slot card-slot" />
      <div className="text">{textwinner}</div>
      <div className="player-deck deck">
        <img
          className="card"
          src={PlayerBDeck[0]?.assets_white}
          alt="ImageCard"
        />
      </div>
      <div className="player-card-slot card-slot" />
    </div>
  );
}
