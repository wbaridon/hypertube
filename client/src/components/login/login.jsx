import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { Typography } from '@material-ui/core';
import {
  loginUser,
  getUserInfoPrivate,
} from 'Actions/index';
import { withTheme } from '@material-ui/core/styles';
import { injectIntl, intlShape } from 'react-intl';
import Avatar from '@material-ui/core/Avatar';
import LoginCard from './login-card';
import './autocomplete-fix.css';

const mapDispatchToProps = (dispatch) => {
  return ({
    logIn: user => dispatch(loginUser(user)),
    getUser: token => dispatch(getUserInfoPrivate(token)),
  });
};

const mapStateToProps = (state) => {
  return ({
    loggedIn: state.user.loggedIn,
    user: state.user,
    token: state.user.token,
    lastAction: state.user.lastAction,
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
    if (props.token !== '' && props.loggedIn !== 'true') {
      props.getUser(props.token);
    }
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
      loggedIn,
      lastAction,
      user,
      intl,
    } = this.props;
    const { currentUser } = this.state;

    if (lastAction === 'LOGIN_USER_IN_PROGRESS') {
      return (<Typography>LOADING</Typography>);
    }
    if (loggedIn === 'true') {
      return (
        <React.Fragment>
          <Typography>
            {`Hello ${user.data.firstName} ${user.data.lastName}!`}
          </Typography>
          <Avatar src={`http://localhost:3000/images/${user.data.picture}`} />
        </React.Fragment>);
    }
    return (<LoginCard intl={intl} currentUser={currentUser} parentLoginHandle={this.handleLogin} parentStateChange={this.handleStateChange} />);
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired, // eslint-disable-line
  theme: PropTypes.shape({
    palette: PropTypes.shape({
      primary: PropTypes.shape({
        main: PropTypes.string.isRequired,
      }).isRequired,
      getContrastText: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  loggedIn: PropTypes.string.isRequired,
  lastAction: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(withTheme()(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(Login))));
