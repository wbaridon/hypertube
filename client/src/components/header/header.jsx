import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Home from '@material-ui/icons/Home';
import Highlight from '@material-ui/icons/Highlight';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleDarkTheme } from 'Actions/index';
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
});

const mapStateToProps = state => ({
  toggleDarkThemeBool: state.toggleDarkTheme,
});

class Header extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { classes, toggleDarkThemeHandler, toggleDarkThemeBool } = this.props;
    return (
      <AppBar position="static">
        <MuiThemeProvider theme={theme}>
          <Toolbar>
            <IconButton component={Link} to="/" color="primary">
              <Home />
            </IconButton>
            <div className={classes.grow} />
            <Login />
            <IconButton color={toggleDarkThemeBool ? 'secondary' : 'primary'} onClick={toggleDarkThemeHandler}>
              <Highlight />
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
  toggleDarkThemeBool: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
