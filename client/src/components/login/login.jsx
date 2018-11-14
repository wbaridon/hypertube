import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { Typography } from '@material-ui/core';
import { loginUser } from 'Actions/index';
import { withTheme } from '@material-ui/core/styles';
import LoginCard from './login-card';

const mapDispatchToProps = (dispatch) => {
  return ({
    logIn: user => dispatch(loginUser(user)),
  });
};

const mapStateToProps = (state) => {
  return ({
    loginState: state.loginUser.loginState,
  });
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        userName: '',
        password: '',
      },
      loginState: props.loginState,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { loginState, enqueueSnackbar } = props;
    if (loginState !== state.loginState) {
      if (loginState === 'LOGIN_USER_ERROR') {
        enqueueSnackbar('Login Error!', { variant: 'error' });
      } else if (loginState === 'LOGIN_USER_SUCCESS') {
        enqueueSnackbar('Login Success!', { variant: 'success' });
      }
      return ({ loginState });
    }
    return null;
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
    const { loginState } = this.state;

    if (loginState === 'LOGIN_USER_IN_PROGRESS') {
      return (<Typography>LOADING</Typography>);
    }
    if (loginState === 'LOGIN_USER_SUCCESS') {
      return (<Typography color="textPrimary">{`Hello ${currentUser.userName}!`}</Typography>);
    }
    return (<LoginCard currentUser={currentUser} parentLoginHandle={this.handleLogin} parentStateChange={this.handleStateChange} />);
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  loginState: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired, // eslint-disable-line
  theme: PropTypes.shape({
    palette: PropTypes.shape({
      primary: PropTypes.shape({
        main: PropTypes.string.isRequired,
      }).isRequired,
      getContrastText: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withTheme()(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(Login)));
