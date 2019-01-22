import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserInfoA } from 'Actions';
import PersonCardDumb from './dumb';

class PersonCard extends Component {
  componentWillMount() {
    const {
      getUserInfo,
      userName,
      token,
      users,
    } = this.props;
    if (!users[userName]) {
      getUserInfo(token, userName);
    }
  }

  render() {
    const { users, userName } = this.props;
    let user;
    if (users[userName]) {
      user = users[userName];
    }
    return (
      users[userName] && users[userName].profilIsFill
        ? (
          <PersonCardDumb
            firstName={user.firstName}
            lastName={user.lastName}
            picture={user.picture}
            userName={userName}
          />
        ) : null
    );
  }
}

PersonCard.propTypes = {
  userName: PropTypes.string.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  users: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getUserInfo: (token, userName) => getUserInfoA(token, userName, dispatch),
});

const mapStateToProps = state => ({
  users: state.getUserList.users,
  token: state.user.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonCard);
