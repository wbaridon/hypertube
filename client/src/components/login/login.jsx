import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { loginUser } from '../../actions/index';
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
      <Grid container direction="row" justify="space-around" wrap="nowrap">
        <Grid item>
          <LoginCard currentUser={currentUser} parentLoginHandle={this.handleLogin} parentStateChange={this.handleStateChange} />
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};

Login.url = '/login';
export default connect(mapStateToProps, mapDispatchToProps)(Login);
