import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  IconButton,
  Avatar,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { logoutUserA, openSidebarA } from '../../redux/actions';

function LoggedIn({
  userData,
  logoutHandler,
  handleOpenSidebar,
}) {
  return (
    <React.Fragment>
      <Button onClick={logoutHandler}>
        <FormattedMessage id="logout.logoutButton" />
      </Button>
      <IconButton onClick={handleOpenSidebar}>
        <Avatar src={`http://localhost:3000/images/${userData.picture}`} />
      </IconButton>
    </React.Fragment>
  );
}

LoggedIn.propTypes = {
  userData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  handleOpenSidebar: PropTypes.func.isRequired,
  logoutHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userData: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  logoutHandler: () => dispatch(logoutUserA()),
  handleOpenSidebar: () => dispatch(openSidebarA()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
