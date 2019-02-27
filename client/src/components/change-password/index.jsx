import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeUserPasswordA } from 'Actions';
import { injectIntl, intlShape } from 'react-intl';
import PasswordValidator from 'password-validator';
import ChangePasswordDumb from './dumb';


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

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      currentPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
      currentPasswordError: [],
      newPasswordError: [],
      newPasswordRepeatError: [],
      toggled: false,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleToggle() {
    const { toggled } = this.state;
    if (toggled) {
      this.setState({
        toggled: !toggled,
        currentPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
        currentPasswordError: [],
        newPasswordError: [],
        newPasswordRepeatError: [],
      });
    }
    this.setState({ toggled: !toggled });
  }

  isValidPassword(newPassword, newPasswordRepeat) {
    const errors = schema.validate(newPassword, { list: true });
    const errorsRepeat = schema.validate(newPasswordRepeat, { list: true });
    if (newPassword !== newPasswordRepeat) {
      errors.push('password.notMatch');
    }
    this.setState({ newPasswordError: errors, newPasswordRepeatError: errorsRepeat });
    if (errors.length === 0 && errorsRepeat.length === 0) {
      return (true);
    }
    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      currentPassword,
      newPassword,
      newPasswordRepeat,
    } = this.state;
    const {
      token,
      handleChangeUserPassword,
    } = this.props;
    if (this.isValidPassword(newPassword, newPasswordRepeat)) {
      handleChangeUserPassword(token, currentPassword, newPassword, newPasswordRepeat);
    }
  }

  handleFieldChange(field, value) {
    const { newPassword } = this.state;
    const error = value === '' ? [] : schema.validate(value, { list: true });
    if (field === 'newPasswordRepeat') {
      if (value !== newPassword && value !== '') {
        error.push('notEqual');
      }
    }
    this.setState({ [field]: value, [`${field}Error`]: error });
  }

  render() {
    const {
      currentPassword,
      newPassword,
      newPasswordRepeat,
      currentPasswordError,
      newPasswordError,
      newPasswordRepeatError,
      toggled,
    } = this.state;
    const {
      intl,
    } = this.props;
    return (
      <ChangePasswordDumb
        currentPassword={currentPassword}
        newPassword={newPassword}
        newPasswordRepeat={newPasswordRepeat}
        handleFieldChange={this.handleFieldChange}
        handleSubmit={this.handleSubmit}
        handleToggle={this.handleToggle}
        toggled={toggled}
        currentPasswordError={currentPasswordError}
        newPasswordError={newPasswordError}
        newPasswordRepeatError={newPasswordRepeatError}
        formatMessage={intl.formatMessage}
      />
    );
  }
}

ChangePassword.propTypes = {
  token: PropTypes.string.isRequired,
  handleChangeUserPassword: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
  handleChangeUserPassword: (token, currentPassword, newPassword, newPasswordRepeat) => dispatch(changeUserPasswordA(token, currentPassword, newPassword, newPasswordRepeat)),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));
