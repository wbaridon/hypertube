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
} from '@material-ui/core';
import { closeSidebar } from 'Actions';
import Register from '../register/register';
import Settings from '../settings/settings';
import Login from '../login/login';


function Sidebar({
  open,
  handleClose,
  loggedIn,
}) {
  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      {loggedIn ? <Settings />
        : (
          <React.Fragment>
            <List>
              <ListItem>
                <Login />
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
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  open: state.sidebar.open,
  loggedIn: state.user.tokenValid,
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(closeSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
