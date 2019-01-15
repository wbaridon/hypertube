import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { resetPasswordA, sendEmailA } from 'Actions';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import SendEmail from './send-email';
import ResetPassword from './reset-password';


const mapDispatchToProps = dispatch => ({
  handlePasswordReset: (key, newPassword, newPasswordRepeat, email) => dispatch(resetPasswordA(key, newPassword, newPasswordRepeat, email)),
  handleSendEmail: email => dispatch(sendEmailA(email)),
});

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: qs.parse(props.location.search, { ignoreQueryPrefix: true }).email || '',
      key: qs.parse(props.location.search, { ignoreQueryPrefix: true }).key || '',
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
    const {
      newPassword,
      newPasswordRepeat,
      key,
      email,
    } = this.state;
    const { handlePasswordReset } = this.props;
    handlePasswordReset(key, newPassword, newPasswordRepeat, email);
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
      key,
    } = this.state;
    return (
      <div>
        {
          !key
            ? (
              <SendEmail
                email={email}
                handleFieldChange={this.handleFieldChange}
                handleSubmit={this.handleSendEmailSubmit}
              />
            ) : (
              <ResetPassword
                email={email}
                newPassword={newPassword}
                newPasswordRepeat={newPasswordRepeat}
                handleFieldChange={this.handleFieldChange}
                handleSubmit={this.handleResetPasswordSubmit}
              />)
        }
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  handlePasswordReset: PropTypes.func.isRequired,
  handleSendEmail: PropTypes.func.isRequired,
};

ForgotPassword.url = '/forgot';

export default withRouter(connect(null, mapDispatchToProps)(ForgotPassword));
