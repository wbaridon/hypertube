import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  TextField,
} from '@material-ui/core';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import './styles';

function LoginCard({
  parentLoginHandle,
  parentStateChange,
  currentUser,
  intl,
}) {
  return (
    <span>
      <form action="" onSubmit={e => parentLoginHandle(e)}>
        <TextField
          label={intl.formatMessage({ id: 'login.userName' })}
          type="text"
          name="username"
          value={currentUser.userName}
          onChange={e => parentStateChange('userName', e.target.value)}
        />
        <TextField
          type="password"
          name="password"
          label={intl.formatMessage({ id: 'login.password' })}
          value={currentUser.password}
          onChange={e => parentStateChange('password', e.target.value)}
        />
        <Button type="submit" onClick={parentLoginHandle}>
          {(
            <Typography>
              <FormattedMessage id="login.loginButton" />
            </Typography>
          )}
        </Button>
      </form>
    </span>
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

export default injectIntl(LoginCard);
