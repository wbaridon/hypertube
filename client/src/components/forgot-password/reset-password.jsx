import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Typography } from '@material-ui/core';

function ResetPassword({
  newPassword,
  newPasswordRepeat,
  handleFieldChange,
  handleSubmit,
}) {
  return (
    <div>
      <TextField value={newPassword} onChange={e => handleFieldChange('newPassword', e.target.value)} />
      <TextField value={newPasswordRepeat} onChange={e => handleFieldChange('newPasswordRepeat', e.target.value)} />
      <Button type="submit" onClick={handleSubmit}>
        <Typography>
          Submit
        </Typography>
      </Button>
    </div>

  )
}

ResetPassword.propTypes = {
  newPassword: PropTypes.string.isRequired,
  newPasswordRepeat: PropTypes.string.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ResetPassword;
