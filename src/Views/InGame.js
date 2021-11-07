import React from 'react';
import '../InGame.css';
import Fade from 'react-reveal/Fade';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cardBack from '../card-back.png';
import cards from '../Cards';
import WinnerAnimation from '../components/AnimationGameEnd';
import StartRoundButton from './AppButton';
import '../utils/i18n.js';
import { SocketContext } from '../socket';
import { setLobbyStatusInProgress } from '../redux/action/LobbyAction';

function Board({ isReady, roomID, setLobbyStatusInProgressAction }) {
  function shuffle() {
    for (let index = cards.length - 1; index > 0; index -= 1) {
      const NewIndex = Math.floor(Math.random() * (index + 1));
      const oldValue = cards[NewIndex];
      cards[NewIndex] = cards[index];
      cards[index] = oldValue;
    }
    return cards;
  }

  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const socket = React.useContext(SocketContext);
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
    socket.emit('lobby', {
      event: 'play',
      roomId: roomID,
    });
  }

  React.useEffect(async () => {
    socket.on('game', (message) => {
      if (message.event === 'play') {
        setGameStatus('INPROGRESS');
        console.log('en bas la en bas');
        console.log('test');
        setplayerACard(message.playerA.card);
        console.log(playerACard);
        setplayerBCard(message.playerB.card);
        setpointCounterA(message.playerA.points);
        setpointCounterB(message.playerB.points);
      }
      console.log('game socket on', message);
    });
  }, []);

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
        settextwinner(`${t('PlayerAwin.label')}`);
      } else if (playerBCard.value > playerACard.value) {
        settextwinner(`${t('PlayerBwin.label')}`);
      } else if (playerACard.value === playerBCard.value) {
        setpointCounterA(pointCounterA + 0);
        setpointCounterB(pointCounterB + 0);
      }
    }
    if (playerADeck.length === 0 && gameStatus === 'INPROGRESS') {
      if (pointCounterA > pointCounterB) {
        settextwinner(`${t('WinnerA.label')}`);
      } else {
        settextwinner(`${t('WinnerB.label')}`);
      }
      setGameStatus(`${t('End.label')}`);
    }
  }, [playerACard, playerBCard]);

  function handleRoundClick() {
    socket.emit('game', {
      event: 'next',
      roomId: roomID,
    }); // setplayerACard(playerADeck.pop());
    // setplayerBCard(playerBDeck.pop());
  }

  // function StartGameButton() {
  //   return (
  //     <button
  //       className="button-82-pushable"
  //       type="button"
  //       onClick={handleStartClick}
  //     >
  //       <span className="button-82-shadow" />
  //       <span className="button-82-edge" />
  //       <span className="button-82-front text">Start Game</span>
  //     </button>
  //   );
  // }

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
    <div className="board" onChange={changeLanguage}>
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
              <StartRoundButton
                text={t('StartRound.label')}
                handleRoundClick={() => handleRoundClick()}
              />
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
          <input type="radio" value="en" name="language" defaultChecked />{' '}
          English
          <input type="radio" value="fr" name="language" /> français
          <StartRoundButton
            text={t('StartG.label')}
            handleRoundClick={() => handleStartClick()}
          />
          {isReady ? (
            <StartRoundButton
              text="Start"
              handleRoundClick={() => {
                setLobbyStatusInProgressAction(roomID);
                return handleStartClick();
              }}
            />
          ) : (
            <h1> WAITING FOR OTHER PLAYER </h1>
          )}
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

Board.propTypes = {
  isReady: PropTypes.bool.isRequired,
  roomID: PropTypes.string.isRequired,
  // username: PropTypes.string.isRequired,
  setLobbyStatusInProgressAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    username: state.sample.username,
    isReady: state.sample.isReady,
    roomID: state.sample.roomID,
  };
};

const actionCreators = {
  setLobbyStatusInProgressAction: setLobbyStatusInProgress,
};

const connectedBoard = connect(mapStateToProps, actionCreators)(Board);

export default connectedBoard;
