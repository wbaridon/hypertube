import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
} from '@material-ui/core';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';

const styles = {
  card: {
    width: 310,
  },
};

function LoginCard({ parentLoginHandle, parentStateChange, currentUser, intl, classes }) {
  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          fullWidth
          id="filled-simple-start-adornment"
          variant="filled"
          label={intl.formatMessage({ id: 'login.userName' })}
          type="text"
          value={currentUser.userName}
          onChange={e => parentStateChange('userName', e.target.value)}
        />
        <br />
        <TextField
          fullWidth
          id="filled-adornment-password"
          variant="filled"
          type="password"
          label={intl.formatMessage({ id: 'login.password' })}
          value={currentUser.password}
          onChange={e => parentStateChange('password', e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button onClick={parentLoginHandle}>
          {(
            <Typography>
              <FormattedMessage id="login.loginButton" />
            </Typography>
          )}
        </Button>
      </CardActions>
    </Card>
  );
}

LoginCard.propTypes = {
  currentUser: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  parentLoginHandle: PropTypes.func.isRequired,
  parentStateChange: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(LoginCard));
