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
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  buttonToggle: {
    height: '309px',
    width: '320px',
  },
  ButtonSubmit: {
    minWidth: '326px',
  },
};

function ChangePasswordDumb({
  currentPassword,
  newPassword,
  newPasswordRepeat,
  handleFieldChange,
  toggled,
  handleToggle,
  handleSubmit,
  classes,
}) {
  if (!toggled) {
    return (
      <Grid container spacing={0} direction="column" alignContent="center" justify="center" wrap="nowrap">
        <Grid item>
          <Button variant="contained" className={classes.buttonToggle} onClick={handleToggle}>
            Change Password
          </Button>
        </Grid>
      </Grid>
    );
  }
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <Card>
        <CardContent>
          <Grid container spacing={8} direction="column">
            <Grid item>
              <Grid container direction="row" justify="space-between" alignItems="center" alignContent="center" wrap="nowrap">
                <Grid item>
                  <Typography inline variant="caption">
                    Current Password
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField variant="outlined" value={currentPassword} type="password" onChange={e => handleFieldChange('currentPassword', e.target.value)} />
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
                    New Password
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField variant="outlined" value={newPassword} type="password" onChange={e => handleFieldChange('newPassword', e.target.value)} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="space-between" alignItems="center" alignContent="center" wrap="nowrap">
                <Grid item>
                  <Typography inline variant="caption">
                    Repeat New Password
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField variant="outlined" value={newPasswordRepeat} type="password" onChange={e => handleFieldChange('newPasswordRepeat', e.target.value)} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="space-between" alignItems="center" alignContent="center" wrap="nowrap">
                <Grid item xs={6}>
                  <Button fullWidth onClick={handleToggle}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth className={classes.buttonSubmit} type="submit">
                    Submit
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
  newPassword: PropTypes.string.isRequired,
  newPasswordRepeat: PropTypes.string.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ChangePasswordDumb);
