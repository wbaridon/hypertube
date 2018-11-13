import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from 'Actions/index';
import LoginCard from './login-card';

const mapDispatchToProps = (dispatch) => {
  return ({
    logIn: user => dispatch(loginUser(user)),
  });
};

const mapStateToProps = (state) => {
  return ({
    currentUser: state.user,
  });
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: {
        userName: '',
        password: '',
      },
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(key, value) {
    const { currentUser } = this.state;

    currentUser[key] = value;
    this.setState({ currentUser });
  }

  handleLogin(e) {
    if (e) {
      e.preventDefault();
    }
    const { logIn } = this.props;
    const { currentUser } = this.state;
    logIn(currentUser);
  }

  render() {
    const { currentUser } = this.state;

    return (
      <LoginCard currentUser={currentUser} parentLoginHandle={this.handleLogin} parentStateChange={this.handleStateChange} />
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
