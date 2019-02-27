import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import {
  registerUserA,
  setErrorA,
  clearRegisterDataA,
  loginUserA,
  toggleDarkThemeA,
  setLocaleA,
} from 'Actions';
import handlers, {
  handleSubmit,
  toggleLocale,
  toggleTheme,
  handleClickShowPassword,
} from './event-handlers';
import {
  rotateClockwise,
  rotateCounterClockwise,
  flip,
  handleImageAdd,
  offsetY,
} from './image-handle-functions';
import RegisterCardDumb from './register-card-dumb';

const mapStateToProps = (state) => {
  return ({
    registerData: state.registerUser.registerData,
    loading: state.registerUser.loading,
    success: state.registerUser.success,
    locale: state.locale,
    darkTheme: state.darkTheme,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    registerUserHandler: form => dispatch(registerUserA(form)),
    loginUserHandler: user => dispatch(loginUserA(user)),
    clearRegisterDataHandler: () => dispatch(clearRegisterDataA()),
    setErrorHandler: error => dispatch(setErrorA(error)),
    handleToggleDarkTheme: () => dispatch(toggleDarkThemeA()),
    handleSetLocale: locale => dispatch(setLocaleA(locale)),
  });
};

class RegisterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {
        rawData: null,
        inputFile: null,
        verticalOffset: 0,
        isLandscape: true,
        orientation: 1,
        error: '',
      },
      userName: '',
      userNameError: [],
      firstName: '',
      firstNameError: [],
      lastName: '',
      lastNameError: [],
      email: '',
      emailError: [],
      password: '',
      passwordError: [],
      showPassword: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = handleClickShowPassword.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.rotateCounterClockwise = rotateCounterClockwise.bind(this);
    this.rotateClockwise = rotateClockwise.bind(this);
    this.handleImageAdd = handleImageAdd.bind(this);
    this.handleImageAddWrapper = this.handleImageAddWrapper.bind(this);
    this.flip = flip.bind(this);
    this.offsetY = offsetY.bind(this);
    this.toggleLocale = toggleLocale.bind(this);
    this.toggleTheme = toggleTheme.bind(this);
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
    const {
      success,
    } = this.props;
    if (success) {
      const { userName, password } = this.state;
      const { loginUserHandler } = this.props;
      loginUserHandler({ userName, password });
    }
  }

  handleChange(field, event) {
    const err = handlers[field](event.target.value);
    const fieldError = `${field}Error`;
    this.setState({ [field]: event.target.value, [fieldError]: err });
  }

  handleImageAddWrapper(event) {
    this.handleImageAdd(event.dataTransfer.files[0], event);
  }

  render() {
    const {
      image, imageChanged,
      userName, userNameError,
      firstName, firstNameError,
      lastName, lastNameError,
      email, emailError,
      password, passwordError, showPassword,
    } = this.state;
    const {
      loading,
      locale,
      darkTheme,
    } = this.props;
    if (loading) {
      return (<CircularProgress />);
    }
    return (
      <RegisterCardDumb
        image={image}
        imageChanged={imageChanged}
        userName={userName}
        userNameError={userNameError}
        firstName={firstName}
        firstNameError={firstNameError}
        lastName={lastName}
        lastNameError={lastNameError}
        email={email}
        emailError={emailError}
        password={password}
        passwordError={passwordError}
        locale={locale}
        darkTheme={darkTheme}
        showPassword={showPassword}
        handleChange={this.handleChange}
        handleClickShowPassword={this.handleClickShowPassword}
        handleSubmit={this.handleSubmit}
        toggleLocale={this.toggleLocale}
        toggleTheme={this.toggleTheme}
        handleImageAddWrapper={this.handleImageAddWrapper}
        handleImageAdd={this.handleImageAdd}
        flip={this.flip}
        rotateClockwise={this.rotateClockwise}
        rotateCounterClockwise={this.rotateCounterClockwise}
        offsetY={this.offsetY}
      />
    );
  }
}

RegisterCard.propTypes = {
  registerUserHandler: PropTypes.func.isRequired, // eslint-disable-line
  setErrorHandler: PropTypes.func.isRequired, // eslint-disable-line
  handleSetLocale: PropTypes.func.isRequired, // eslint-disable-line
  handleToggleDarkTheme: PropTypes.func.isRequired, // eslint-disable-line
  locale: PropTypes.string.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  loginUserHandler: PropTypes.func.isRequired,
  registerData: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCard);
