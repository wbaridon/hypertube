import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    maxWidth: 305,
  },
  cardMedia: {
    height: 305,
  },
};

function PersonNotFound({
  classes,
}) {
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia} image="http://localhost:3000/images/placeholder.jpeg" />
      <CardContent>
        <Typography>
          This is where their username would have been
        </Typography>
        <Typography>
          This user does not exist, but nice try you silly corrector you. ;)
        </Typography>
      </CardContent>
    </Card>
  );
}

PersonNotFound.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(PersonNotFound);
