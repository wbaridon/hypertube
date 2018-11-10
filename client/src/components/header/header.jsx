import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Login from '../login/login';

const styles = {
  grow: {
    flexGrow: 1,
  },
};


class Header extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton id="clickMe">
            <AccountCircle />
          </IconButton>
          <div className={classes.grow} />
          <Login />
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Header);
