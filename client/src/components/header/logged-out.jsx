import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IconButton,
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { openSidebarA } from 'Actions';
import Login from '../login/login';

function LoggedOut({
  handleSideBarOpen,
}) {
  return (
    <React.Fragment>
      <Login />
      <IconButton>
        <Add color="primary" onClick={handleSideBarOpen} />
      </IconButton>
    </React.Fragment>
  );
}

LoggedOut.propTypes = {
  handleSideBarOpen: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleSideBarOpen: () => dispatch(openSidebarA()),
});

export default connect(null, mapDispatchToProps)(LoggedOut);
