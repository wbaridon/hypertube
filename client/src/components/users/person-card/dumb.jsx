import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  Typography,
  CardActions,
  ButtonBase,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  cardMedia: {
    height: '320px',
  },
  userCard: {
    width: '320px',
  },
};

function PersonCardDumb({
  firstName,
  lastName,
  picture,
  classes,
  userName,
}) {
  return (
    <ButtonBase
      focusRipple
      focusVisibleClassName={classes.focusVisible}
      className={classes.userCard}
      component={Link}
      to={`/user/${userName}`}
    >
      <Card className={classes.userCard}>
        <CardMedia className={classes.cardMedia} image={picture} />
        <CardActions>
          <Typography>
            {firstName}
          </Typography>
          <Typography>
            {lastName}
          </Typography>
        </CardActions>
      </Card>
    </ButtonBase>
  );
}

PersonCardDumb.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  userName: PropTypes.string.isRequired,
};

export default withStyles(styles)(PersonCardDumb);
