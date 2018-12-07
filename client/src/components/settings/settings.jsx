import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

class Settings extends Component {
  componentDidMount() {

  }

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <Typography>
        {user.data ? user.data.email : 'no USER'}
      </Typography>
    );
  }
}


Settings.url = '/settings';
Settings.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
  user: state.user,
});


export default connect(mapStateToProps, null)(Settings);
