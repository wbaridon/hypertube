import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeUserPasswordA } from 'Actions';
import ChangePasswordDumb from './dumb';

function isValidPassword(newPassword, newPasswordRepeat) {
  return true;
}

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      currentPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
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
      });
    }
    this.setState({ toggled: !toggled });
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
    if (isValidPassword(newPassword, newPasswordRepeat)) {
      handleChangeUserPassword(token, currentPassword, newPassword, newPasswordRepeat);
    }
  }

  handleFieldChange(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    const {
      currentPassword,
      newPassword,
      newPasswordRepeat,
      toggled,
    } = this.state;
    return (
      <ChangePasswordDumb
        currentPassword={currentPassword}
        newPassword={newPassword}
        newPasswordRepeat={newPasswordRepeat}
        handleFieldChange={this.handleFieldChange}
        handleSubmit={this.handleSubmit}
        handleToggle={this.handleToggle}
        toggled={toggled}
      />
    );
  }
}

ChangePassword.propTypes = {
  token: PropTypes.string.isRequired,
  handleChangeUserPassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
  handleChangeUserPassword: (token, currentPassword, newPassword, newPasswordRepeat) => dispatch(changeUserPasswordA(token, currentPassword, newPassword, newPasswordRepeat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
