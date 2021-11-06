import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Fade from 'react-reveal/Flip';
import sword from '../Sword.jpg';
import bouclier2 from '../bouclier2.jpg';
import { SocketContext } from '../socket';
import AppButton from './AppButton';

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 300,
  },
});

const games = [
  {
    id: 1,
    status: 'NotStarted',
    playerOne: 'bibiii',
    playerTwo: 'loulou',
  },
  {
    id: 2,
    status: 'InProgress',
    playerOne: 'volta',
    playerTwo: 'hector',
  },
  {
    id: 2,
    status: 'InProgress',
    playerOne: 'volta',
    playerTwo: 'hector',
  },
  {
    id: 2,
    status: 'InProgress',
    playerOne: 'volta',
    playerTwo: 'hector',
  },
  {
    id: 2,
    status: 'InProgress',
    playerOne: 'volta',
    playerTwo: 'hector',
  },
];

export default function ImgMediaCard() {
  const classes = useStyles();
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    socket.on('lobby', (message) => {
      console.log('ON LOBBY', message);
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
      const phr = `Game :${playerOne.playerOne} vs ${playerOne.playerTwo}`;
      return (
        <Typography gutterBottom variant="h5">
          {phr}
        </Typography>
      );
    }

    return (
      <Typography gutterBottom variant="h5">
        No player
      </Typography>
    );
  }

  return (
    <Fade top cascade>
      <Grid container spacing={2}>
        {games.map((game) => {
          if (game.status === 'InProgress') {
            return (
              <Grid item>
                <Card
                  className={classes.root}
                  onClick={() => emit('toto', game.playerOne)}
                >
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
                        playerOne={game.playerOne}
                        playerTwo={game.playerTwo}
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          }
          return (
            <Grid item>
              <Card className={classes.root}>
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
                      playerOne={game.playerOne}
                      playerTwo={game.playerTwo}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <AppButton
        text="Create Lobby"
        handleRoundClick={() => console.log('test')}
      />
    </Fade>
  );
}
