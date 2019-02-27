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

const footerTheme = createMuiTheme({
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

const styles = theme => ({
  appBar: {
    [theme.breakpoints.only('xs')]: {
      height: 40,
      maxHeight: 40,
      minHeight: 40,
    },
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    [theme.breakpoints.only('xs')]: {
      height: 40,
      maxHeight: 40,
      minHeight: 40,
    },
    paddingLeft: 0,
    paddingRight: 0,
  },
});

function Footer({
  classes,
}) {
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <MuiThemeProvider theme={footerTheme}>
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
