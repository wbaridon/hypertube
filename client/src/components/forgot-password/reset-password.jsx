import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Tooltip,
} from '@material-ui/core';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';


const styles = {
  firstItem: {
    marginTop: '10px',
  },
  lastItem: {
    marginBottom: '10px',
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

function ResetPassword({
  newPassword,
  newPasswordRepeat,
  newPasswordError,
  newPasswordRepeatError,
  handleFieldChange,
  handleSubmit,
  email,
  intl,
  classes,
  clearAll,
}) {
  return (
    <form action="">
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">
        <Grid item className={classes.firstItem}>
          <Typography>
            <FormattedMessage
              id="resetPassword.resetForEmail"
              values={{
                email,
              }}
            />
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip placement="top" open={newPasswordError.length !== 0} title={errorArrayToString(newPasswordError, intl.formatMessage)}>
            <TextField
              type="password"
              label={intl.formatMessage({ id: 'resetPassword.newPassword' })}
              value={newPassword}
              onChange={e => handleFieldChange('newPassword', e.target.value)}
            />
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip placement="top" open={newPasswordRepeatError.length !== 0} title={errorArrayToString(newPasswordRepeatError, intl.formatMessage)}>
            <TextField
              type="password"
              label={intl.formatMessage({ id: 'resetPassword.newPasswordRepeat' })}
              value={newPasswordRepeat}
              onChange={e => handleFieldChange('newPasswordRepeat', e.target.value)}
            />
          </Tooltip>
        </Grid>
        <Grid item>
          <Button type="submit" onClick={handleSubmit}>
            <Typography>
              <FormattedMessage id="resetPassword.submit" />
            </Typography>
          </Button>
        </Grid>
        <Grid item className={classes.lastItem}>
          <Button onClick={clearAll}>
            <FormattedMessage id="resetPassword.clearAll" />
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

ResetPassword.propTypes = {
  newPassword: PropTypes.string.isRequired,
  newPasswordError: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  newPasswordRepeat: PropTypes.string.isRequired,
  newPasswordRepeatError: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  classes: PropTypes.shape({
    firstItem: PropTypes.string.isRequired,
    lastItem: PropTypes.string.isRequired,
  }).isRequired,
  clearAll: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  resetPasswordLoading: state.forgotPassword.loading,
});

export default injectIntl(connect(mapStateToProps)(withStyles(styles)(ResetPassword)));
