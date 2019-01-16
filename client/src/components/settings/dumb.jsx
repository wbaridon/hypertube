import React from 'react'
import PropTypes from 'prop-types'
import {
  TextField,
  Switch,
  Menu,
  MenuItem,
  Typography,
  Button,
} from '@material-ui/core';

function DumbSettings({
  userName,
  firstName,
  lastName,
  email,
  locale,
  darkTheme,
  handleFieldChange,
  handleMenuOpen,
  handleMenuClose,
  anchorEl,
}) {
  return (
    <div>
      <TextField value={userName} onChange={e => handleFieldChange('userName', e.target.value)} />
      <br />
      <TextField value={firstName} onChange={e => handleFieldChange('firstName', e.target.value)} />
      <br />
      <TextField value={lastName} onChange={e => handleFieldChange('lastName', e.target.value)} />
      <br />
      <TextField value={email} onChange={e => handleFieldChange('email', e.target.value)} />
      <br />
      <Typography>
        Dark theme
        <Switch checked={darkTheme} value={darkTheme} onChange={() => handleFieldChange('darkTheme', !darkTheme)} />
      </Typography>
      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={e => handleMenuOpen(e)}
      >
        {locale}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose()}
      >
        <MenuItem onClick={() => handleMenuClose('en')}>en</MenuItem>
        <MenuItem onClick={() => handleMenuClose('fr')}>fr</MenuItem>
      </Menu>
    </div>
  );
}

DumbSettings.propTypes = {
  userName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleMenuOpen: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape({}),
};

DumbSettings.defaultProps = {
  anchorEl: null,
};

export default DumbSettings;
