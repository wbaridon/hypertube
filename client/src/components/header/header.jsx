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
import ExitToApp from '@material-ui/icons/ExitToApp';
import People from '@material-ui/icons/People';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  toggleDarkThemeA,
  setLocaleA,
  openSidebarA,
  logoutUserA,
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
  userData: state.user.data,
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
  userData,
}) {
  return (
    <AppBar position="sticky" className={classes.appBar}>
      <MuiThemeProvider theme={theme}>
        <Toolbar>
          <IconButton component={Link} to="/" color="primary">
            <Home />
          </IconButton>
          <span className={classes.spacer} />
          {/* <IconButton onClick={handleOpenSidebar}>
            <ExitToApp color="primary" />
          </IconButton>
          <IconButton component={Link} to="/users">
            <People color="primary" />
          </IconButton> */}
          {
            userData
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
};

Header.defaultProps = {
  userData: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)((Header)));
