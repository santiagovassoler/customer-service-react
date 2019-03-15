import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Logout from "../components/Logout"
const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function Forbidden(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
       <CardMedia
          className={classes.media}
          image="../403-error.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            403 Forbidden
          </Typography>
          <Typography component="p">
            You don't have permission to access this page!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Logout/>
      </CardActions>
    </Card>
  );
}

Forbidden.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Forbidden);