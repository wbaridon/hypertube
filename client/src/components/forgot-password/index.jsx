import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { resetPasswordA, sendEmailA } from 'Actions';
import { connect } from 'react-redux';
import SendEmail from './send-email';
import ResetPassword from './reset-password';


const mapDispatchToProps = dispatch => ({
  handlePasswordReset: (newPassword, token) => dispatch(resetPasswordA(newPassword, token)),
  handleSendEmail: email => dispatch(sendEmailA(email)),
});

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      newPassword: '',
      newPasswordRepeat: '',
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleResetPasswordSubmit = this.handleResetPasswordSubmit.bind(this);
    this.handleSendEmailSubmit = this.handleSendEmailSubmit.bind(this);
  }

  handleFieldChange(field, value) {
    this.setState({ [field]: value });
  }

  handleResetPasswordSubmit(e) {
    e.preventDefault();
    const { newPassword } = this.state;
    const { handlePasswordReset } = this.props;
    handlePasswordReset(newPassword, null);
  }

  handleSendEmailSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { handleSendEmail } = this.props;
    handleSendEmail(email);
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
          handleSubmit={this.handleResetPasswordSubmit}
        />
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  history: PropTypes.shape({}).isRequired,
  handlePasswordReset: PropTypes.func.isRequired,
  handleSendEmail: PropTypes.func.isRequired,
};

ForgotPassword.url = '/forgot';

export default withRouter(connect(null, mapDispatchToProps)(ForgotPassword));
