import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Button,
  Divider,
  Tooltip,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  buttonToggle: {
    height: '320px',
    width: '100%',
  },
  ButtonSubmit: {
    minWidth: '326px',
  },
};

const errorArrayToString = (errorArray, formatMessage) => {
  const newArray = [];
  errorArray.forEach((item) => {
    const newItem = formatMessage({ id: `changePassword.${item}` });
    newArray.push(newItem);
  });
  const ret = newArray.join(',');
  return (ret);
};

function ChangePasswordDumb({
  currentPassword,
  newPassword,
  newPasswordRepeat,
  currentPasswordError,
  newPasswordError,
  newPasswordRepeatError,
  handleFieldChange,
  toggled,
  handleToggle,
  handleSubmit,
  formatMessage,
  classes,
}) {
  if (!toggled) {
    return (
      <Button variant="contained" className={classes.buttonToggle} onClick={handleToggle}>
        <FormattedMessage id="settings.changePassword.button" />
      </Button>
    );
  }
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <Card>
        <CardContent>
          <Grid container spacing={16} direction="column">
            <Grid item>
              <Grid container direction="row" justify="space-between" alignItems="center" alignContent="center" wrap="nowrap">
                <Grid item>
                  <Typography inline variant="caption">
                    <FormattedMessage id="settings.changePassword.currentPassword" />
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip placement="top" open={currentPasswordError.length !== 0} title={errorArrayToString(currentPasswordError, formatMessage)}>
                    <TextField variant="outlined" value={currentPassword} type="password" onChange={e => handleFieldChange('currentPassword', e.target.value)} />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="space-between" alignItems="center" alignContent="center" wrap="nowrap">
                <Grid item>
                  <Typography inline variant="caption">
                    <FormattedMessage id="settings.changePassword.newPassword" />
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip placement="top" open={newPasswordError.length !== 0} title={errorArrayToString(newPasswordError, formatMessage)}>
                    <TextField variant="outlined" value={newPassword} type="password" onChange={e => handleFieldChange('newPassword', e.target.value)} />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="space-between" alignItems="center" alignContent="center" wrap="nowrap">
                <Grid item>
                  <Typography inline variant="caption">
                    <FormattedMessage id="settings.changePassword.repeatNewPassword" />
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip placement="top" open={newPasswordRepeatError.length !== 0} title={errorArrayToString(newPasswordRepeatError, formatMessage)}>
                    <TextField variant="outlined" value={newPasswordRepeat} type="password" onChange={e => handleFieldChange('newPasswordRepeat', e.target.value)} />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="space-between" alignItems="center" alignContent="center" wrap="nowrap">
                <Grid item xs={6}>
                  <Button fullWidth onClick={handleToggle}>
                    <FormattedMessage id="settings.changePassword.cancelChangePassword" />
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth className={classes.buttonSubmit} type="submit" onClick={handleSubmit}>
                    <FormattedMessage id="settings.changePassword.submit" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
}

ChangePasswordDumb.propTypes = {
  currentPassword: PropTypes.string.isRequired,
  currentPasswordError: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  newPassword: PropTypes.string.isRequired,
  newPasswordError: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  newPasswordRepeat: PropTypes.string.isRequired,
  newPasswordRepeatError: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
  formatMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChangePasswordDumb);
