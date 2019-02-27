import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  TextField,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import {
  intlShape,
} from 'react-intl';
import ChevronRight from '@material-ui/icons/ChevronRight';

const styles = theme => ({
  inputs: {
    [theme.breakpoints.only('xs')]: {
      minWidth: 65,
      width: 65,
      maxWidth: 65,
    },
  },
  loginStuff: {
    [theme.breakpoints.only('xs')]: {
      minHeight: 65,
      height: 65,
      maxHeight: 65,
    },
  },
  smallFont: {
    [theme.breakpoints.only('xs')]: {
      fontSize: '12px',
    },
  },
});

function LoginCard({
  parentLoginHandle,
  parentStateChange,
  currentUser,
  intl,
  classes,
}) {
  return (
    <form name="login" action="" onSubmit={e => parentLoginHandle(e)}>
      <TextField
        className={`${classes.loginStuff} loginInputs ${classes.inputs}`}
        autoComplete="username"
        label={intl.formatMessage({ id: 'login.userName' })}
        InputLabelProps={{
          className: classes.smallFont,
          margin: 'dense',
        }}
        type="text"
        value={currentUser.userName}
        onChange={e => parentStateChange('userName', e.target.value)}
      />
      <TextField
        className={`${classes.loginStuff} loginInputs ${classes.inputs}`}
        autoComplete="current-password"
        type="password"
        InputLabelProps={{
          margin: 'dense',
          className: classes.smallFont,
        }}
        label={intl.formatMessage({ id: 'login.password' })}
        value={currentUser.password}
        onChange={e => parentStateChange('password', e.target.value)}
      />
      <Tooltip title={intl.formatMessage({ id: 'login.tooltip' })}>
        <IconButton className={classes.loginStuff} type="submit" onClick={parentLoginHandle}>
          <ChevronRight color="primary" />
        </IconButton>
      </Tooltip>
    </form>
  );
}

LoginCard.propTypes = {
  currentUser: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  parentLoginHandle: PropTypes.func.isRequired,
  parentStateChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(LoginCard);
