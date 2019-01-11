import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  cardMedia: {
    height: '160px',
  },
  userCard: {
  },
};

function PersonCardDumb({
  firstName,
  lastName,
  picture,
  classes,
}) {
  return (
    <Card className={classes.userCard}>
      <CardMedia className={classes.cardMedia} image={`http://localhost:3000/images/${picture}`} />
      <CardActions>
        <Typography>
          {firstName}
        </Typography>
        <Typography>
          {lastName}
        </Typography>
      </CardActions>
    </Card>
  );
}

PersonCardDumb.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(PersonCardDumb);
