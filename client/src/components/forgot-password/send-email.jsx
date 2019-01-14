import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  firstItem: {
    marginTop: '10px',
  },
  lastItem: {
    marginBottom: '10px',
  },
};

function SendEmail({
  email,
  handleFieldChange,
  handleSubmit,
  intl,
  classes,
}) {
  return (
    <form action="" onSubmit={handleSubmit}>
      <Grid container spacing={8} direction="column" alignItems="center" justify="center">
        <Grid item className={classes.firstItem}>
          <Typography>
            <FormattedMessage id="resetPassword.title" />
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label={intl.formatMessage({ id: 'email' })}
            value={email}
            onChange={e => handleFieldChange('email', e.target.value)}
          />
        </Grid>
        <Grid item className={classes.lastItem}>
          <Button type="submit" onClick={e => handleSubmit(e)}>
            <Typography>
              <FormattedMessage id="resetPassword.submit" />
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

SendEmail.propTypes = {
  email: PropTypes.string.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  classes: PropTypes.shape({
    firstItem: PropTypes.string.isRequired,
    lastItem: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(injectIntl(SendEmail));
