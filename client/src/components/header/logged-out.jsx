import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { openSidebarA } from 'Actions';
import Login from '../login/login';

function LoggedOut({
  handleSideBarOpen,
  intl,
}) {
  return (
    <React.Fragment>
      <Login />
      <Tooltip title={intl.formatMessage({ id: 'login.forgotPassword' })}>
        <IconButton component={Link} to="/forgot">
          <Typography variant="button">
            ?
          </Typography>
        </IconButton>
      </Tooltip>
      <Tooltip title={intl.formatMessage({ id: 'login.registerTab' })}>
        <IconButton onClick={handleSideBarOpen}>
          <Add color="primary" />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

LoggedOut.propTypes = {
  handleSideBarOpen: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleSideBarOpen: () => dispatch(openSidebarA()),
});

export default injectIntl(connect(null, mapDispatchToProps)(LoggedOut));
