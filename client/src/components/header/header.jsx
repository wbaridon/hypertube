import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  MuiThemeProvider,
  createMuiTheme,
  Typography,
  Grid,
  withStyles,
} from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import Highlight from '@material-ui/icons/Highlight';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  toggleDarkTheme,
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


const mapDispatchToProps = dispatch => ({
  toggleDarkThemeHandler: () => dispatch(toggleDarkTheme()),
  changeLocale: locale => dispatch(setLocale(locale)),
});

const mapStateToProps = state => ({
  darkThemeBool: state.darkTheme,
  locale: state.locale,
});

const styles = {
  appBar: {
    // minWidth: 500,
  },
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const {
      toggleDarkThemeHandler,
      darkThemeBool,
      changeLocale,
      locale,
      classes,
    } = this.props;
    return (
      <AppBar position="sticky" className={classes.appBar}>
        <MuiThemeProvider theme={theme}>
          <Toolbar>
            <Grid container wrap="nowrap" justify="space-between" alignContent="center" alignItems="center">
              <Grid item>
                <IconButton component={Link} to="/" color="primary">
                  <Home />
                </IconButton>
              </Grid>
              <Grid item>
                <Grid container direction="row" wrap="nowrap" alignContent="center" alignItems="center">
                  <Grid item>
                    <Login />
                  </Grid>
                  <Grid item>
                    <IconButton component={Link} to="/register/">
                      <Typography>
                        Register
                      </Typography>
                      <br />
                      <SupervisedUserCircle color="primary" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
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
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)((Header)));
