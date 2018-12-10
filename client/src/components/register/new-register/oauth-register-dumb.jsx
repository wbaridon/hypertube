import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Card, CardContent, CardHeader, Typography } from '@material-ui/core';

export default function OauthRegisterDumb({
  userName,
  email,
  firstName,
  lastName,
  image,
  handleChange,
  provider,
}) {
  return (
    <Card>
      <CardHeader title={`Register with ${provider}`} />
      <CardContent>
        <TextField value={userName} onChange={e => handleChange('userName', e.target.value)} />
        <br />
        <TextField disabled value={email} onChange={e => handleChange('email', e.target.value)} />
        <br />
        <TextField value={firstName} onChange={e => handleChange('firstName', e.target.value)} />
        <br />
        <TextField value={lastName} onChange={e => handleChange('lastName', e.target.value)} />
      </CardContent>
    </Card>
  );
}

OauthRegisterDumb.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  image: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  provider: PropTypes.string.isRequired,
};
