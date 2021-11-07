import React, { useState } from 'react';
import '../InGame.css';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import cardBack from '../card-back.png';
import cards from '../Cards';
import WinnerAnimation from '../components/AnimationGameEnd';
import StartRoundButton from './AppButton';
import { SocketContext } from '../socket';
import {
  setLobbyStatusInProgress,
  setLobbyStatusFinished,
} from '../redux/action/LobbyAction';

function Board({
  isReady,
  roomID,
  setLobbyStatusInProgressAction,
  setLobbyStatusFinishedAction,
}) {
  function shuffle() {
    for (let index = cards.length - 1; index > 0; index -= 1) {
      const NewIndex = Math.floor(Math.random() * (index + 1));
      const oldValue = cards[NewIndex];
      cards[NewIndex] = cards[index];
      cards[index] = oldValue;
    }
    return cards;
  }

  const navigate = useNavigate();
  const socket = React.useContext(SocketContext);
  const [Deck] = React.useState(shuffle());
  const [playerADeck, setplayerADeck] = React.useState([]);
  const [playerACard, setplayerACard] = React.useState([]);
  const [playerBCard, setplayerBCard] = React.useState([]);
  const [textwinner, settextwinner] = React.useState(
    'Press Start Round to begin',
  );
  const [pointCounterA, setpointCounterA] = React.useState(0);
  const [pointCounterB, setpointCounterB] = React.useState(0);
  const [pseudoJ1, setpseudoj1] = useState('J1');
  const [pseudoJ2, setpseudoj2] = useState('J2');
  const [gameStatus, setGameStatus] = React.useState('NOTSTARTED');

  function handleStartClick() {
    socket.emit('lobby', {
      event: 'play',
      roomId: roomID,
    });
  }

  function handleLobbyClick() {
    navigate('/lobby');
  }

  React.useEffect(async () => {
    socket.on('game', (message) => {
      if (message.event === 'play') {
        setGameStatus('INPROGRESS');
        setpseudoj1(message.playerA.username);
        setpseudoj2(message.playerB.username);
        setplayerACard(message.playerA.card);
        setplayerBCard(message.playerB.card);
        setpointCounterA(message.playerA.points);
        setpointCounterB(message.playerB.points);
      }
      if (message.event === 'finished') {
        settextwinner(message.win);
        setGameStatus('FINISHED');
        setLobbyStatusFinishedAction(roomID);
      }
    });
  }, []);

  React.useEffect(() => {
    if (playerACard?.value !== undefined && playerBCard?.value !== undefined) {
      if (playerACard.value > playerBCard.value) {
        settextwinner(`Winner is : ${pseudoJ1}`);
      } else if (playerBCard.value > playerACard.value) {
        settextwinner(`Winner is : ${pseudoJ2}`);
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
  }, [Deck]);

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
              <span className="pointcounter"> {pointCounterA}</span>
            </div>
          </div>
          <div className="middle-board">
            <div
              className="text"
              style={{
                fontSize: 'xxx-large',
                fontFamily: 'cursive',
                filter: 'drop-shadow(5px 4px 6px)',
                color: 'yellow',
              }}
            >
              {textwinner}
            </div>
            <div>
              <StartRoundButton
                text="Start Round"
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
            <div className="card-slot">
              {playerBCard !== undefined && (
                <img className="card" src={playerBCard.assets_white} alt="" />
              )}
              <span className="pointcounter"> {pointCounterB}</span>
            </div>
          </div>
        </>
      )}
      {gameStatus === 'NOTSTARTED' && (
        <div>
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
        <div
          className="WinnerIs"
          style={{
            fontSize: 'xxx-large',
            fontFamily: 'cursive',
            filter: 'drop-shadow(5px 4px 6px)',
            color: 'yellow',
          }}
        >
          <WinnerAnimation className="Animation" />
          {textwinner}
          <div>
            <StartRoundButton
              text="Return To Lobby"
              handleRoundClick={() => handleLobbyClick()}
            />
          </div>
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
  setLobbyStatusFinishedAction: PropTypes.func.isRequired,
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
  setLobbyStatusFinishedAction: setLobbyStatusFinished,
};

const connectedBoard = connect(mapStateToProps, actionCreators)(Board);

export default connectedBoard;
