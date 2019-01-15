import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  CircularProgress,
} from '@material-ui/core';
import {
  loginUserA,
  logoutUserA,
} from 'Actions';
import { injectIntl, intlShape } from 'react-intl';
import LoginCard from './login-card';
import './autocomplete-fix.css';

const mapDispatchToProps = (dispatch) => {
  return ({
    logIn: user => dispatch(loginUserA(user)),
    logout: () => dispatch(logoutUserA()),
  });
};

const mapStateToProps = (state) => {
  return ({
    loading: state.loginUser.loading,
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
    const {
      intl,
      loading,
    } = this.props;
    const { currentUser } = this.state;
    if (loading) {
      return (<CircularProgress />);
    }
    return (
      <LoginCard intl={intl} currentUser={currentUser} parentLoginHandle={this.handleLogin} parentStateChange={this.handleStateChange} />
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Login));
