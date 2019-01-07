import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function ResetPassword({
  newPassword,
  newPasswordRepeat,
  handleFieldChange,
}) {
  return (
    <div>
      <TextField value={newPassword} onChange={e => handleFieldChange('newPassword', e.target.value)} />
      <TextField value={newPasswordRepeat} onChange={e => handleFieldChange('newPasswordRepeat', e.target.value)} />
    </div>

  )
}

ResetPassword.propTypes = {
  newPassword: PropTypes.string.isRequired,
  newPasswordRepeat: PropTypes.string.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
};

export default ResetPassword;
