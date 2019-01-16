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
import {
  closeSidebarA,
  logoutUserA,
} from 'Actions';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import People from '@material-ui/icons/People';
import { FormattedMessage } from 'react-intl';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Close from '@material-ui/icons/Close';
import Register from '../register/register';
import Providers from '../providers';
import Settings from '../settings/settings';

const styles = theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      maxWidth: '320px',
      width: '320px',
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
  handleLogout,
  classes,
}) {
  return (
    <Drawer classes={{ paper: classes.root }} anchor="right" open={open} onClose={handleClose}>
      <Button fullWidth onClick={handleClose}>
        <Close />
      </Button>
      {loggedIn
        ? (
          <React.Fragment>
            <Button onClick={handleLogout}>
              LOGOUTTEMP
            </Button>
            <IconButton component={Link} to="/users" onClick={handleClose}>
              <People />
            </IconButton>
            {/* <Login /> */}
            {/* <Settings /> */}
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
                <IconButton component={Link} to="/forgot">
                  <Typography>
                    <FormattedMessage id="login.forgotPassword" />
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
  handleLogout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  open: state.sidebar.open,
  loggedIn: state.user.tokenValid,
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(closeSidebarA()),
  handleLogout: () => dispatch(logoutUserA()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)((Sidebar)));
