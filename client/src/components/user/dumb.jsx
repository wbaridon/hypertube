import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const styles = {
  card: {
    marginTop: 30,
    maxWidth: 320,
    width: 320,
  },
  cardMedia: {
    height: 320,
  },
};

function UserDumb({
  userName,
  firstName,
  lastName,
  picture,
  classes,
}) {
  return (
    <span>
      <Button
        style={{
          position: 'absolute',
          left: '50%',
          top: '90px',
          transform: 'translate(-50%, -50%)',
          zIndex: '3',
        }}
        component={Link}
        to="/users"
      >
        <FormattedMessage id="user.back" />
      </Button>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Card className={classes.card}>
            <CardMedia className={classes.cardMedia} image={picture} />
            <CardContent>
              <Typography>
                {userName}
              </Typography>
              <Typography>
                {`${firstName} ${lastName}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </span>
  );
}

UserDumb.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  userName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

export default withStyles(styles)(UserDumb);
