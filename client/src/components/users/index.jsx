import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
} from '@material-ui/core';
import { getUserListA } from 'Actions';
import LoadingDots from '../loading-dots';
import PersonCard from './person-card';

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
      <Grid container spacing={24} justify="center">
        {userList ? userList.map(user => <Grid item key={user.userName}><PersonCard userName={user.userName} /></Grid>) : <LoadingDots />}
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
