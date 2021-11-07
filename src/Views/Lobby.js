import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useTranslation } from 'react-i18next';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Fade from 'react-reveal/Fade';
import { useNavigate } from 'react-router-dom';
import sword from '../Sword.jpg';
import bouclier2 from '../bouclier2.jpg';
import { SocketContext } from '../socket';
import AppButton from './AppButton';
import '../utils/i18n.js';
import {
  getAllLobby,
  createLobby,
  addPlayerBToLobby,
} from '../redux/action/LobbyAction';
import setReady from '../redux/action/ReadyAction';
import setRoomId from '../redux/action/RoomAction';

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 300,
  },
});

function ImgMediaCard(props) {
  const classes = useStyles();
  const socket = React.useContext(SocketContext);
  const navigate = useNavigate();

  const [gameLobby, setgameLobby] = useState([]);

  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  React.useEffect(async () => {
    setgameLobby(await props.getAllLobby());

    socket.on('lobby', (message) => {
      if (message.event === 'join') {
        props.setReady(message.ready);
        navigate('/lobby/game');
      }
    });
  }, []);

  const emit = (playerName, roomId) => {
    socket.emit('lobby', {
      event: 'join',
      playerName,
      roomId,
    });
  };

  function CheckPlayer(playerOne, playerTwo) {
    if (playerOne != null && playerTwo != null) {
      const phr = ` ${t('Lobby.label')}  ${playerOne.playerOne} vs ${
        playerOne.playerTwo
      }`;
      return (
        <Typography gutterBottom variant="h5">
          {phr}
        </Typography>
      );
    }

    return (
      <Typography gutterBottom variant="h5">
        {t('Noplayer.label')}
      </Typography>
    );
  }

  return (
    <div className="Container" onChange={changeLanguage}>
      <Grid container spacing={2}>
        {gameLobby.map((game) => {
          if (game.status === 'IN_PROGRESS') {
            return (
              <Grid item>
                <Fade top>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Game one"
                        height="240px"
                        image={sword}
                        title="Game One"
                      />
                      <CardContent>
                        <CheckPlayer
                          playerOne={game.playerA}
                          playerTwo={game.playerB}
                        />
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Fade>
              </Grid>
            );
          }
          if (game.status === 'NOT_STARTED') {
            return (
              <Grid item>
                <Fade top>
                  <Card
                    className={classes.root}
                    onClick={() => {
                      props.setRoomId(game.id);
                      props.addPlayerBToLobby(game.id, props.username);

                      emit(props.username, game.id);
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Game one"
                        height="240px"
                        image={bouclier2}
                        title="Game One"
                      />
                      <CardContent>
                        <CheckPlayer
                          playerOne={game.playerA}
                          playerTwo={game.playerB}
                        />
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Fade>
              </Grid>
            );
          }
          return null;
        })}
        {/* <div className="Container" onChange={changeLanguage}>        </div> */}
      </Grid>
      <AppButton
        text={t('Create.label')}
        handleRoundClick={async () => {
          const createdLobby = await props.createLobby(props.username);
          if (createLobby) {
            props.setRoomId(createdLobby.data.id);
            emit(props.username, createdLobby.data.id);
          }
        }}
      />
      <input type="radio" value="en" name="language" defaultChecked /> English
      <input type="radio" value="fr" name="language" /> français
    </div>
  );
}

ImgMediaCard.propTypes = {
  getAllLobby: PropTypes.func.isRequired,
  createLobby: PropTypes.func.isRequired,
  setReady: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setRoomId: PropTypes.func.isRequired,
  addPlayerBToLobby: PropTypes.func.isRequired,
};

const actionCreators = {
  getAllLobby,
  createLobby,
  setReady,
  setRoomId,
  addPlayerBToLobby,
};

const mapStateToProps = (state) => {
  return {
    username: state.sample.username,
    roomID: state.sample.roomID,
  };
};
const connectedLobby = connect(mapStateToProps, actionCreators)(ImgMediaCard);

export default connectedLobby;
