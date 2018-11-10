import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { logoutUser } from '../../actions/index';
import LogoutCard from './logout-card';

const mapDispatchToProps = (dispatch) => {
  return ({
    logOut: user => dispatch(logoutUser(user)),
  });
};

const mapStateToProps = (state) => {
  return ({
    currentUser: state.user,
  });
};

class Logout extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: {
        userName: '',
        password: '',
      },
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(key, value) {
    const { currentUser } = this.state;

    currentUser[key] = value;
    this.setState({ currentUser });
  }

  handleLogout(e) {
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
          <LogoutCard currentUser={currentUser} parentLogoutHandle={this.handleLogout} parentStateChange={this.handleStateChange} />
        </Grid>
      </Grid>
    );
  }
}

Logout.propTypes = {
  logIn: PropTypes.func.isRequired,
};

Logout.url = '/login';
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
