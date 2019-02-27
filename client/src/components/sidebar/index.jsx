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
  Grid,
} from '@material-ui/core';
import {
  closeSidebarA,
} from 'Actions';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import People from '@material-ui/icons/People';
import { FormattedMessage, injectIntl } from 'react-intl';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Settings from '@material-ui/icons/Settings';
import Listicon from '@material-ui/icons/List';
import Close from '@material-ui/icons/Close';
import RegisterCard from '../register/register-card';
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
  list: {
    paddingTop: 0,
  },
});

function Sidebar({
  open,
  handleClose,
  loggedIn,
  classes,
}) {
  return (
    <Drawer classes={{ paper: classes.root }} anchor="right" open={open} onClose={handleClose}>
      <Button fullWidth onClick={handleClose} style={{ minHeight: '36px' }}>
        <Close />
      </Button>
      {loggedIn
        ? (
          <React.Fragment>
            <IconButton component={Link} to="/users" onClick={handleClose}>
              <People />
            </IconButton>
            <IconButton component={Link} to="/settings" onClick={handleClose}>
              <Settings />
            </IconButton>
            <IconButton component={Link} to="/watchlist" onClick={handleClose}>
              <Listicon />
            </IconButton>
          </React.Fragment>
        )
        : (
          <React.Fragment>
            <List className={classes.list}>
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
                <Grid container direction="column" justify="center" alignItems="center" alignContent="center" wrap="nowrap">
                  <Grid item>
                    <RegisterCard />
                  </Grid>
                </Grid>
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
};

const mapStateToProps = state => ({
  open: state.sidebar.open,
  loggedIn: state.user.tokenValid,
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(closeSidebarA()),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)((Sidebar))));
