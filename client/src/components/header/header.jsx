import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import { toggleDarkTheme } from 'Actions/index';
import Login from '../login/login';

const styles = (theme) => {
  console.log(theme);
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
        <Toolbar>
          <IconButton>
            <AccountCircle />
          </IconButton>
          <div className={classes.grow} />
          <Login />
          <IconButton onClick={toggleDarkThemeHandler}>
            <AccountCircle />
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
