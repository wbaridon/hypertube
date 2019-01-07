import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Typography } from '@material-ui/core';

function SendEmail({
  email,
  login,
  handleFieldChange,
  handleSubmit,
}) {
  return (
    <form action="" onSubmit={handleSubmit}>
      <TextField value={email} onChange={e => handleFieldChange('email', e.target.value)} />
      <TextField value={login} onChange={e => handleFieldChange('login', e.target.value)} />
      <Button type="submit" onClick={e => handleSubmit(e)}>
        <Typography>
          Submit
        </Typography>
      </Button>
    </form>
  );
}

SendEmail.propTypes = {
  email: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SendEmail;
