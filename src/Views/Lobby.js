import React from 'react';
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

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 300,
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();
  const socket = React.useContext(SocketContext);
  // const status = null;

  React.useEffect(() => {
    console.log('ca c est lourd !!!');
    socket.emit('LOBBY JOINED');
  }, []);
  const Games = [
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
  ];

  function CheckStatus() {
    const cardarray = [];
    for (let i = 0; i < Games.length; i += 1) {
      if (Games.at(i).status === 'InProgress') {
        cardarray.push(
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
                  playerOne={Games.at(i).playerOne}
                  playerTwo={Games.at(i).playerTwo}
                />
              </CardContent>
            </CardActionArea>
          </Card>,
        );
      }
      if (Games.at(i).status === 'NotStarted') {
        cardarray.push(
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
                  playerOne={Games.at(i).playerOne}
                  playerTwo={Games.at(i).playerTwo}
                />
              </CardContent>
            </CardActionArea>
          </Card>,
        );
      }
    }
    return cardarray;
  }

  function CheckPlayer(playerOne, playerTwo) {
    console.log('TEEEEEEEEEEEEEST');
    console.log(playerOne);
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
      <CheckStatus />
    </Fade>
  );
}
