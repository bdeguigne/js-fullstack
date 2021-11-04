import React from 'react';
import '../InGame.css';
import cardBack from '../card-back.png';
import cards from '../Cards';

export default function Board() {
  function shuffle() {
    for (let index = cards.length - 1; index > 0; index -= 1) {
      const NewIndex = Math.floor(Math.random() * (index + 1));
      const oldValue = cards[NewIndex];
      cards[NewIndex] = cards[index];
      cards[index] = oldValue;
    }
    return cards;
  }

  const [Deck] = React.useState(shuffle());
  const [playerADeck, setplayerADeck] = React.useState([]);
  const [playerBDeck, setplayerBDeck] = React.useState([]);
  const [playerACard, setplayerACard] = React.useState([]);
  const [playerBCard, setplayerBCard] = React.useState([]);
  const [textwinner, settextwinner] = React.useState(
    'Press Start Round to begin',
  );
  const [pointCounterA, setpointCounterA] = React.useState(0);
  const [pointCounterB, setpointCounterB] = React.useState(0);
  const [gameStatus, setGameStatus] = React.useState('NOTSTARTED');

  function handleStartClick() {
    setGameStatus('INPROGRESS');
  }

  React.useEffect(() => {
    if (playerACard?.value !== undefined && playerBCard?.value !== undefined) {
      console.log(
        'player B value =>',
        playerBCard.value,
        'player A value =>',
        playerACard.value,
        playerADeck,
      );

      if (playerACard.value > playerBCard.value) {
        settextwinner('Winner is Pseudo player A');
        setpointCounterA(pointCounterA + 1);
      } else if (playerBCard.value > playerACard.value) {
        settextwinner('Winner is Pseudo player B');
        setpointCounterB(pointCounterB + 1);
      } else if (playerACard.value === playerBCard.value) {
        setpointCounterA(pointCounterA + 0);
        setpointCounterB(pointCounterB + 0);
      }
    }
    if (playerADeck.length === 0 && gameStatus === 'INPROGRESS') {
      if (pointCounterA > pointCounterB) {
        settextwinner('player A win');
      } else {
        settextwinner('PLayer B win');
      }
      setGameStatus('FINISHED');
    }
  }, [playerACard, playerBCard]);

  function handleRoundClick() {
    setplayerACard(playerADeck.pop());
    setplayerBCard(playerBDeck.pop());
  }

  function StartGameButton() {
    return (
      <button type="button" onClick={handleStartClick}>
        START GAME
      </button>
    );
  }

  function StartRoundButton() {
    return (
      <button type="button" onClick={handleRoundClick}>
        START ROUND
      </button>
    );
  }

  React.useEffect(() => {
    const deckMidpoint = Math.ceil(Deck.length / 2);
    setplayerADeck(Deck.slice(0, deckMidpoint));
    setplayerBDeck(Deck.slice(deckMidpoint, Deck.length));
  }, [Deck]);

  React.useEffect(() => {
    console.log('Player A Black =>', playerADeck);
    console.log('Player B White =>', playerBDeck);
  }, [playerADeck, playerBDeck]);

  React.useEffect(() => {
    console.log('Player A Black Card  =>', playerACard);
    console.log('Player B White Card =>', playerBCard);
  }, [playerACard, playerBCard]);

  React.useEffect(() => {
    console.log('Game Status =>', gameStatus);
  }, [gameStatus]);

  return (
    <div className="board">
      {gameStatus === 'INPROGRESS' && (
        <>
          <div className="computer-deck deck">
            <img className="card" src={cardBack} alt="ImageCardBack" />
          </div>
          <div className="computer-card-slot card-slot">
            {playerACard !== undefined && (
              <img className="card" src={playerACard.assets_black} alt="" />
            )}
          </div>
          <span> {pointCounterA}</span>
          <div className="text">{textwinner}</div>
          <div>
            <StartRoundButton />
          </div>
          <div className="player-deck deck">
            <img className="card" src={cardBack} alt="ImageCardBack" />
          </div>
          <span> {pointCounterB}</span>
          <div className="player-card-slot card-slot">
            {playerBCard !== undefined && (
              <img className="card" src={playerBCard.assets_white} alt="" />
            )}
          </div>
        </>
      )}
      {gameStatus === 'NOTSTARTED' && (
        <div>
          <StartGameButton />
        </div>
      )}
      {gameStatus === 'FINISHED' && <div> {textwinner} </div>}
    </div>
  );
}
