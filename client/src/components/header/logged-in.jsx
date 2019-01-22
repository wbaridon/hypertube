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
        <Avatar src={userData.picture} />
      </IconButton>
    </React.Fragment>
  );
}

LoggedIn.propTypes = {
  userData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    picture: PropTypes.string.isRequired,
  }),
  handleOpenSidebar: PropTypes.func.isRequired,
  logoutHandler: PropTypes.func.isRequired,
};

LoggedIn.defaultProps = {
  userData: {
    firstName: 'MissingFN',
    lastName: 'MissingLN',
  },
};

const mapStateToProps = state => ({
  userData: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  logoutHandler: () => dispatch(logoutUserA()),
  handleOpenSidebar: () => dispatch(openSidebarA()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
