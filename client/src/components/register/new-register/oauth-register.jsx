import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { registerUserOauth } from 'Actions/register-user-oauth';
import OauthRegisterDumb from './oauth-register-dumb';

const mapStateToProps = state => ({
  registerData: state.user.registerData,
});

const mapDispatchToProps = dispatch => ({

});

class OauthRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.registerData.userName,
      email: props.registerData.email,
      firstName: props.registerData.firstName,
      lastName: props.registerData.lastName,
      image: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    const { provider } = this.props;

    return (
      <OauthRegisterDumb handleChange={this.handleChange} provider={provider} {...this.state} />
    );
  }
}

OauthRegister.propTypes = {
  registerData: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  provider: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OauthRegister);
