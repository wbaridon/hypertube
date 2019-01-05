import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  TextField,
} from '@material-ui/core';

function ForgotPasswordDumb({
  handleFieldChange,
  email,
  login,
  newPassword,
  newPasswordRepeat,
}) {
  return (
    <Card>
      <form action="">
        <CardContent>
          <TextField
            value={email}
            onChange={e => handleFieldChange('email', e.target.value)}
          />
          <TextField
            value={login}
            onChange={e => handleFieldChange('login', e.target.value)}
          />
          <TextField
            value={newPassword}
            onChange={e => handleFieldChange('newPassword', e.target.value)}
          />
          <TextField
            value={newPasswordRepeat}
            onChange={e => handleFieldChange('newPasswordRepeat', e.target.value)}
          />

        </CardContent>
        <CardActions>


        </CardActions>
      </form>
    </Card>
  )
}

ForgotPasswordDumb.propTypes = {
  handleFieldChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  newPasswordRepeat: PropTypes.string.isRequired,
}

export default ForgotPasswordDumb;
