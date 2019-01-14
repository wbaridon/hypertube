import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUserA } from '../../redux/actions';

function LoggedIn({
  userData,
  logoutHandler,
}) {
  return (
    <div onClick={logoutHandler}>
      {userData.firstName}
    </div>
  );
}

LoggedIn.propTypes = {
  userData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,

};

const mapStateToProps = state => ({
  userData: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  logoutHandler: () => dispatch(logoutUserA()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
