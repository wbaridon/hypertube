import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid, Typography,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { getUserListA } from 'Actions';
import LoadingDots from '../loading-dots';
import PersonCard from './person-card';

class Users extends Component {
  constructor(props) {
    super(props);
    if (!props.userList.fetched) {
      props.getUserList(props.token);
    }
  }

  render() {
    const { userList } = this.props;
    if (!userList) {
      return (<Typography><FormattedMessage id="users.noUsers" /></Typography>);
    }
    return (
      <Grid container spacing={8} justify="center" alignItems="center">
        {userList.length !== 0 ? userList.map(user => <Grid item key={user.userName}><PersonCard userName={user.userName} /></Grid>) : <LoadingDots />}
      </Grid>
    );
  }
}

Users.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.shape({})),
  getUserList: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

Users.defaultProps = {
  userList: null,
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
