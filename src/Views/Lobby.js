import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Fade from 'react-reveal/Flip';
import sword from '../Sword.jpg';

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 300,
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Fade top cascade>
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
            <Typography gutterBottom variant="h5">
              Game Number One
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Fade>
  );
}
