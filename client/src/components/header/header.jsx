import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  MuiThemeProvider,
  createMuiTheme,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Home from '@material-ui/icons/Home';
import Highlight from '@material-ui/icons/Highlight';
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  toggleDarkTheme,
  logoutUser,
  setLocale,
} from 'Actions/index';
import Login from '../login/login';

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
  grow: {
    flexGrow: 1,
  },
};

const mapDispatchToProps = dispatch => ({
  toggleDarkThemeHandler: () => dispatch(toggleDarkTheme()),
  logout: () => dispatch(logoutUser()),
  changeLocale: locale => dispatch(setLocale(locale)),
});

const mapStateToProps = state => ({
  darkThemeBool: state.darkTheme,
  locale: state.locale,
  user: state.user,
});

class Header extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const {
      classes,
      toggleDarkThemeHandler,
      darkThemeBool,
      user,
      logout,
      changeLocale,
      locale,
    } = this.props;
    return (
      <AppBar position="sticky">
        <MuiThemeProvider theme={theme}>
          <Toolbar>
            <IconButton component={Link} to="/" color="primary">
              <Home />
            </IconButton>
            <div className={classes.grow} />
            <Login />

            {
              user.data && user.data.firstName
                ? (
                  <React.Fragment>
                    <IconButton component={Link} to="/settings">
                      <Settings />
                    </IconButton>
                    <IconButton onClick={logout}>
                      <ExitToApp />
                    </IconButton>
                  </React.Fragment>
                )
                : null}
            <IconButton color={darkThemeBool ? 'secondary' : 'primary'} onClick={toggleDarkThemeHandler}>
              <Highlight />
            </IconButton>
            <IconButton component={Link} to="/register/">
              <SupervisedUserCircle />
            </IconButton>
            <IconButton onClick={() => changeLocale(locale === 'en' ? 'fr' : 'en')}>
              <Typography>
                {locale}
              </Typography>
            </IconButton>
          </Toolbar>
        </MuiThemeProvider>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  toggleDarkThemeHandler: PropTypes.func.isRequired,
  darkThemeBool: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
