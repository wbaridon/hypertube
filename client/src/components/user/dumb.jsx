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

function UserDumb({
  userName,
  firstName,
  lastName,
  picture,
  classes,
}) {
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia} image={`http://localhost:3000/images/${picture}`} />
      <CardContent>
        <Typography>
          {userName}
        </Typography>
        <Typography>
          {`This user is called ${firstName} and their last name is ${lastName}, They probably like rowboats, hunting for doughnuts, and other such activities.`}
        </Typography>
      </CardContent>
    </Card>
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
