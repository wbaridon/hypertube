import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  toggleDarkThemeA,
  setLocaleA,
} from 'Actions/index';
import LoggedIn from './logged-in';
import LoggedOut from './logged-out';

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


const mapDispatchToProps = dispatch => ({
  toggleDarkThemeHandler: () => dispatch(toggleDarkThemeA()),
  changeLocale: locale => dispatch(setLocaleA(locale)),
});

const mapStateToProps = state => ({
  darkThemeBool: state.darkTheme,
  locale: state.locale,
  dataFetched: state.user.dataFetched,
});

const styles = {
  appBar: {
  },
  spacer: {
    flexGrow: 1,
  },
};

function Header({
  classes,
  dataFetched,
}) {
  return (
    <AppBar position="sticky" className={classes.appBar}>
      <MuiThemeProvider theme={theme}>
        <Toolbar>
          <IconButton component={Link} to="/" color="primary">
            <Home />
          </IconButton>
          <span className={classes.spacer} />
          {
            dataFetched
              ? (
                <LoggedIn />
              )
              : (
                <LoggedOut />
              )
          }
        </Toolbar>
      </MuiThemeProvider>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  userData: PropTypes.shape({}),
  dataFetched: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  userData: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)((Header)));
