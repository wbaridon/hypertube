import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserInfoPrivate } from 'Actions';

class Settings extends Component {
  componentDidMount = () => {
    const { getUser, token } = this.props;
    getUser(token);
  }

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div>
        {user.email}
      </div>
    );
  }
}


Settings.url = '/settings';
Settings.propTypes = {
  user: PropTypes.shape({}).isRequired,
  getUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: token => dispatch(getUserInfoPrivate(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
