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
      loggedIn,
      logout,
      changeLocale,
      locale,
    } = this.props;
    return (
      <AppBar position="static">
        <MuiThemeProvider theme={theme}>
          <Toolbar>
            <IconButton component={Link} to="/" color="primary">
              <Home />
            </IconButton>
            <div className={classes.grow} />
            <Login />
            <IconButton color={darkThemeBool ? 'secondary' : 'primary'} onClick={toggleDarkThemeHandler}>
              <Highlight />
            </IconButton>
            {
              loggedIn === 'true'
                ? (
                  <React.Fragment>
                    <IconButton component={Link} to="/settings">
                      <Settings />
                    </IconButton>
                    <IconButton onClick={logout}>
                      <Typography>
                        {locale}
                      </Typography>
                    </IconButton>
                  </React.Fragment>
                )
                : null}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
