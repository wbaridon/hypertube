import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Avatar,
  Grid,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  avatar: {
    width: 18,
    height: 18,
  },
};

function LoginProviderDumb({ providers, classes }) {
  return (
    <Grid container direction="column" spacing={0} alignContent="center" alignItems="center">
      <Grid item>
        <Typography>Sign in with</Typography>
      </Grid>
      <Grid item>
        {providers.map((provider) => {
          return (<IconButton title={provider.tooltip} href={provider.url} key={provider.name}><Avatar className={classes.avatar} src={provider.icon} /></IconButton>);
        })}
      </Grid>
    </Grid>
  );
}

LoginProviderDumb.propTypes = {
  classes: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  providers: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
};

export default withStyles(styles)(LoginProviderDumb);
