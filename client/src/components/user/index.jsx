import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import getUserInfoAPI from '../../api_tools/get-user-info';
import UserDumb from './dumb';

function getUserFromUrl(url) {
  const parts = url.split('/');
  const user = parts.pop() || parts.pop(); // handle potential trailing slash

  return (user);
}

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: getUserFromUrl(props.history.location.pathname),
    };
  }

  async componentWillMount() {
    const { token } = this.props;
    const { user } = this.state;
    console.log(user);
    const userData = await getUserInfoAPI(token, user);
    console.log(userData);

    this.setState({ user: userData.data });
  }


  render() {
    const { user } = this.state;
    console.log(user);
    return (
      user.userName
        ? (
          <UserDumb
            firstName={user.firstName}
            lastName={user.lastName}
            userName={user.userName}
            picture={user.picture}
          />
        ) : null
    );
  }
}

User.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
});

User.url = '/user';

export default connect(mapStateToProps)(withRouter(User));
