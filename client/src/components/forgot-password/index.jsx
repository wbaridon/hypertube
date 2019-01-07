import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SendEmail from './send-email';
import ResetPassword from './reset-password';

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      newPassword: '',
      newPasswordRepeat: '',
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(field, value) {
    this.setState({ [field]: value });
  }

  handleResetPasswordSubmit(e) {
    const { handlePasswordReset } = this.props;
    e.preventDefault();
  }

  handleSendEmailSubmit(e) {
    e.preventDefault();
    const { handleSendEmail } = this.props;
  }

  render() {
    const {
      email,
      newPassword,
      newPasswordRepeat,
    } = this.state;
    return (
      <div>
        <SendEmail
          email={email}
          handleFieldChange={this.handleFieldChange}
          handleSubmit={this.handleSendEmailSubmit}
        />
        <ResetPassword
          newPassword={newPassword}
          newPasswordRepeat={newPasswordRepeat}
          handleFieldChange={this.handleFieldChange}
          handleSubmit={this.handleResetPassword}
        />
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

ForgotPassword.url = '/forgot';

export default withRouter(ForgotPassword);
