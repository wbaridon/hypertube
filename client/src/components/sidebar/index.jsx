import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Drawer,
  Button,
  Typography,
  List,
  ListItem,
  Divider,
  IconButton,
} from '@material-ui/core';
import { closeSidebar } from 'Actions';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Close from '@material-ui/icons/Close';
import Register from '../register/register';
import Login from '../login/login';
import Providers from '../providers';

const styles = theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      maxWidth: '320px',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '1200px',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1600px',
    },
  },
});

function Sidebar({
  open,
  handleClose,
  loggedIn,
  classes,
  width,
}) {
  return (
    <Drawer classes={{ paper: classes.root }} anchor="right" open={open} onClose={handleClose}>
      <Button fullWidth onClick={handleClose}>
        <Close />
      </Button>
      {loggedIn
        ? (
          <React.Fragment>
            <Login />
          </React.Fragment>
        )
        : (
          <React.Fragment>
            <List>
              <ListItem>
                <Providers />
              </ListItem>
              <Divider />
              <ListItem>
                <Login />
                <IconButton component={Link} to="/forgot">
                  <Typography>
                    ForgotPassword
                  </Typography>
                  <SupervisedUserCircle color="primary" />
                </IconButton>
              </ListItem>
              <Divider />
              <ListItem>
                <Register />
              </ListItem>
            </List>
          </React.Fragment>
        )}
    </Drawer>
  );
}


Sidebar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  open: state.sidebar.open,
  loggedIn: state.user.tokenValid,
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(closeSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withWidth()((Sidebar))));
