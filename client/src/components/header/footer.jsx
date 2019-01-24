import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  MuiThemeProvider,
  createMuiTheme,
  Grid,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffffff',
      main: '#000000',
      dark: '#ffffff',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = {
  appBar: {
    top: 'auto',
    bottom: 0,
    // minWidth: 500,
  },
  toolbar: {
  },
};

function Footer({
  classes,
}) {
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <MuiThemeProvider theme={theme}>
        <Toolbar className={classes.toolbar}>
          <Grid container spacing={0} wrap="nowrap" justify="space-between" alignContent="center" alignItems="center">
            <Grid item>
              <Typography variant="button">
                Guiricha, Wbaridon, Frahaing, Pihouvie
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </MuiThemeProvider>
    </AppBar>
  );
}

Footer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Footer);
