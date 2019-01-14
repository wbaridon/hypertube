import React from 'react';
import PropTypes from 'prop-types';
import Login from '../login/login';

function LoggedOut() {
  return (
    <Login modal />
  );
}

LoggedOut.propTypes = {
};

export default LoggedOut;
