import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Highlight from '@material-ui/icons/Highlight';
import { connect } from 'react-redux';
import { toggleDarkTheme } from 'Actions/index';
import { NavLink } from 'react-router-dom';
import Login from '../login/login';


const styles = (theme) => {
  return ({
    grow: {
      flexGrow: 1,
    },
    inputColor: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
  });
};

const mapDispatchToProps = dispatch => ({
  toggleDarkThemeHandler: () => dispatch(toggleDarkTheme()),
});

class Header extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { classes, toggleDarkThemeHandler } = this.props;
    return (
      <AppBar position="static">
        <nav className="nav-wrapper black darken-3">
          <div className="container">
            <ul className="right">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/video">Video</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
            </ul>
          </div>
        </nav>
        <Toolbar>
          <IconButton>
            <AccountCircle />
          </IconButton>
          <div className={classes.grow} />
          <Login />
          <IconButton onClick={toggleDarkThemeHandler}>
            <Highlight />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  toggleDarkThemeHandler: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Header));
