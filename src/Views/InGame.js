import React from 'react';
import '../InGame.css';
import Fade from 'react-reveal/Fade';
import cardBack from '../card-back.png';
import cards from '../Cards';
import WinnerAnimation from '../components/AnimationGameEnd';

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
      <button
        className="button-82-pushable"
        type="button"
        onClick={handleStartClick}
      >
        <span className="button-82-shadow" />
        <span className="button-82-edge" />
        <span className="button-82-front text">Start Game</span>
      </button>
    );
  }

  function StartRoundButton() {
    return (
      <button
        className="button-82-pushable"
        type="button"
        onClick={handleRoundClick}
      >
        <span className="button-82-shadow" />
        <span className="button-82-edge" />
        <span className="button-82-front text">Start Round</span>
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
          <div className="top-board">
            <div className="computer-deck">
              <Fade top>
                <img className="card" src={cardBack} alt="ImageCardBack" />
              </Fade>
            </div>
            <div className="card-slot">
              {playerACard !== undefined && (
                <img className="card" src={playerACard.assets_black} alt="" />
              )}
            </div>
          </div>
          <div className="middle-board">
            <span> {pointCounterA}</span>
            <div className="text">{textwinner}</div>
            <div>
              <StartRoundButton />
            </div>
          </div>
          <div className="bot-board">
            <div className="player-deck">
              <Fade bottom>
                <img className="card" src={cardBack} alt="ImageCardBack" />
              </Fade>
            </div>
            <span> {pointCounterB}</span>
            <div className="card-slot">
              {playerBCard !== undefined && (
                <img className="card" src={playerBCard.assets_white} alt="" />
              )}
            </div>
          </div>
        </>
      )}
      {gameStatus === 'NOTSTARTED' && (
        <div>
          <StartGameButton />
        </div>
      )}
      {gameStatus === 'FINISHED' && (
        <div className="WinnerIs">
          <WinnerAnimation className="Animation" />
          {textwinner}
        </div>
      )}
    </div>
  );
}
