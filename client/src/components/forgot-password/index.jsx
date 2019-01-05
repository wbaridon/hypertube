import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ForgotPasswordDumb from './dumb';

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      login: '',
      newPassword: '',
      newPasswordRepeat: '',
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    const {
      email,
      login,
      newPassword,
      newPasswordRepeat,
    } = this.state;
    return (
      <ForgotPasswordDumb
        email={email}
        login={login}
        newPassword={newPassword}
        newPasswordRepeat={newPasswordRepeat}
        handleFieldChange={this.handleFieldChange}
      />
    );
  }
}

ForgotPassword.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

ForgotPassword.url = '/forgot';

export default withRouter(ForgotPassword);
