import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { resetPasswordA, sendEmailA } from 'Actions';
import { connect } from 'react-redux';
import PasswordValidator from 'password-validator';
import * as qs from 'query-string';
import SendEmail from './send-email';
import ResetPassword from './reset-password';

const schema = new PasswordValidator();
schema
  .is().min(8)
  .is().max(30)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

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
      newPasswordError: [],
      newPasswordRepeatError: [],
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleResetPasswordSubmit = this.handleResetPasswordSubmit.bind(this);
    this.handleSendEmailSubmit = this.handleSendEmailSubmit.bind(this);
  }

  isValidPassword(newPassword, newPasswordRepeat) {
    const errors = schema.validate(newPassword, { list: true });
    const errorsRepeat = schema.validate(newPasswordRepeat, { list: true });
    if (newPassword !== newPasswordRepeat) {
      errors.push('password.notMatch');
    }
    console.log(errors, errorsRepeat);
    this.setState({ newPasswordError: errors, newPasswordRepeatError: errorsRepeat });
    if (errors.length === 0 && errorsRepeat.length === 0) {
      return (true);
    }
    return false;
  }

  handleFieldChange(field, value) {
    if (field !== 'newPassword' && field !== 'newPasswordRepeat') {
      this.setState({ [field]: value });
    } else {
      const { newPassword } = this.state;
      const error = value === '' ? [] : schema.validate(value, { list: true });
      if (field === 'newPasswordRepeat') {
        if (value !== newPassword && value !== '') {
          error.push('notEqual');
        }
      }
      this.setState({ [field]: value, [`${field}Error`]: error });
    }
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
      newPasswordError,
      newPasswordRepeatError,
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
                newPasswordError={newPasswordError}
                newPasswordRepeatError={newPasswordRepeatError}
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
