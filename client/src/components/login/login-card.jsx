import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  TextField,
} from '@material-ui/core';
import {
  FormattedMessage,
  intlShape,
} from 'react-intl';


function LoginCard({
  parentLoginHandle,
  parentStateChange,
  currentUser,
  intl,
}) {
  return (
    <form action="" onSubmit={e => parentLoginHandle(e)}>

      <TextField
        className="loginInputs"
        InputProps={{ disableUnderline: true }}
        autoComplete="username"
        label={intl.formatMessage({ id: 'login.userName' })}
        type="text"
        value={currentUser.userName}
        onChange={e => parentStateChange('userName', e.target.value)}
      />
      <TextField
        className="loginInputs"
        InputProps={{ disableUnderline: true }}
        autoComplete="current-password"
        type="password"
        label={intl.formatMessage({ id: 'login.password' })}
        value={currentUser.password}
        onChange={e => parentStateChange('password', e.target.value)}
      />
      <Button style={{ paddingTop: '16px', paddingBottom: '16px' }} type="submit" onClick={parentLoginHandle}>
        {(
          <Typography>
            <FormattedMessage id="login.loginButton" />
          </Typography>
        )}
      </Button>
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
};

export default LoginCard;
