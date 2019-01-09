import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  CircularProgress,
  IconButton,
  Grid,
} from '@material-ui/core';
import {
  loginUser,
  logoutUser,
} from 'Actions';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import Avatar from '@material-ui/core/Avatar';
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LoginProviderDumb from './login-provider-dumb';
import LoginCard from './login-card';
import './autocomplete-fix.css';
import Providers from '../providers';

const mapDispatchToProps = (dispatch) => {
  return ({
    logIn: user => dispatch(loginUser(user)),
    logout: () => dispatch(logoutUser()),
  });
};

const mapStateToProps = (state) => {
  return ({
    user: state.user,
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
      user,
      intl,
      loading,
      logout,
    } = this.props;
    const { currentUser } = this.state;

    if (user.data && user.data.firstName) {
      return (
        <Grid container alignContent="center" alignItems="center" justify="space-around">
          <Grid item>
            <Typography>
              {`Hi ${user.data.firstName}!`}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar src={`${BACKEND}images/${user.data.picture}`} />
          </Grid>
          <Grid item>
            <IconButton component={Link} to="/settings">
              <Settings />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={logout}>
              <ExitToApp />
            </IconButton>
          </Grid>
        </Grid>);
    } if (loading) {
      return (<CircularProgress />);
    }
    return (
      <LoginCard intl={intl} currentUser={currentUser} parentLoginHandle={this.handleLogin} parentStateChange={this.handleStateChange} />
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  intl: intlShape.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Login));
