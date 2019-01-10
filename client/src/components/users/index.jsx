import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserListA } from 'Actions';

class Users extends Component {
  constructor(props) {
    super(props);
    if (props.userList === null) {
      props.getUserList(props.token);
    }
  }

  render() {
    const { userList } = this.props;
    return (
      <div>
        {userList ? userList.map(user => <div key={user.id}>{user.userName}</div>) : null}
      </div>
    );
  }
}

Users.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getUserList: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userList: state.getUserList.userList,
  token: state.user.token,
});
const mapDispatchToProps = dispatch => ({
  getUserList: token => dispatch(getUserListA(token)),
});

Users.url = '/users';

export default connect(mapStateToProps, mapDispatchToProps)(Users);
